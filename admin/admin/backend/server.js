const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const jwt =require("jsonwebtoken");


const app = express();
const PORT =  5001;


app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
  user: "puneeth",
  host: "localhost",
  database: "patient",
  password: "puneeth",
  port: "5432",
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL Database");
  }
});


app.get("/", (req, res) => {
  res.send("Hello from Node.js Backend!");
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    try {
      
      const result = await pool.query(
        "SELECT * FROM admin WHERE name = $1 AND password = $2",
        [name, password]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      const user = result.rows[0];
      const token = jwt.sign({  name: user.name, id:user.id }, "puneeth@05$*", {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post("/add-doctor",async (req,res)=>{
    try{
        const {email}=req.body;
        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const result= await pool.query(
            "INSERT INTO doctors (email) VALUES ($1) RETURNING *", [email]
        );
        res.json({ message: "Doctor added successfully!", doctor: result.rows[0] });
    }catch(err){
        console.error("Error inserting doctor:", err);
        res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/add-pharmasict",async (req,res)=>{
    try{
        const {email}=req.body;
        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const result= await pool.query(
            "INSERT INTO pharmacists (email) VALUES ($1) RETURNING *", [email]
        );
        res.json({ message: "Pharmacist added successfully!", pharmasict: result.rows[0] });
    }catch(err){
        console.error("Error insertin Pharmacist:", err);
        res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/reset-password", async (req, res) => {
    try {
        const { id, name, currentPassword, newPassword } = req.body;

        const response = await pool.query(
            "SELECT password FROM admin WHERE id = $1", 
            [id]
        );

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const storedPassword = response.rows[0].password;

        if (storedPassword !== currentPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        await pool.query(
            "UPDATE admin SET password = $1 WHERE id = $2", 
            [newPassword, id]
        );

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/medicine-suggestions", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        const response = await pool.query(
            "SELECT medicine_name FROM medicines WHERE medicine_name ILIKE $1 LIMIT 5",
            [`%${query}%`]
        );

        res.json(response.rows.map(row => row.medicine_name));
    } catch (err) {
        console.error("Error fetching suggestions:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/add-medicines", async (req, res) => {
    try {
        const { medicines } = req.body;

        for (const medicine of medicines) {
            const { name, quantity } = medicine;

            
            const existingMedicine = await pool.query(
                "SELECT quantity FROM medicines WHERE medicine_name = $1",
                [name]
            );

            if (existingMedicine.rows.length > 0) {
                
                await pool.query(
                    "UPDATE medicines SET quantity = quantity + $1 WHERE medicine_name = $2",
                    [quantity, name]
                );
            } else {
                
                await pool.query(
                    "INSERT INTO medicines (medicine_name, quantity) VALUES ($1, $2)",
                    [name, quantity]
                );
            }
        }

        res.json({ message: "Medicines updated successfully" });
    } catch (err) {
        console.error("Error updating medicines:", err);
        res.status(500).json({ message: "Server error" });
    }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
