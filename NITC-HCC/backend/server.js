const express= require('express')
const pool=require("./db.js");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt= require("jsonwebtoken");
const PDFDocument = require("pdfkit");

const app=express()
app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "seproject475@gmail.com" ,
      pass: "cqmq ktyu dcix kjsx", 
    },
  });


  const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Access Denied" });
    }

    jwt.verify(token, "puneeth@05$*", (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log("Decoded token:", user); 
        req.user = user;
        next();
    });
};

app.post("/send-otp",async (req,res)=>{

    try{
        const {email} =req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const patientCheck = await pool.query("SELECT * FROM patients WHERE email = $1", [email]);

        if (patientCheck.rows.length === 0) {
            return res.status(404).json({ message: "Email not registered in the system" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query(
            "INSERT INTO otps (email,otp,expires_at) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3" ,
            [email,otp,expiresAt]
        );

        await transporter.sendMail({
            from: "seproject475@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
          });

          res.json({ message: "OTP sent successfully" });
    }catch(err){
        console.error("Error sending OTP:", err);
        res.status(500).json({ message: "Internal server error" });
    };
})


app.post("/send-otp1",async (req,res)=>{
  const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
  
    try {
      const query = `
        SELECT email FROM doctors WHERE email = $1
      `;
      const result = await pool.query(query, [email]);
  
      if (result.rows.length > 0) {
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query(
            "INSERT INTO otps (email,otp,expires_at) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3" ,
            [email,otp,expiresAt]
        );

        await transporter.sendMail({
            from: "seproject475@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
          });

          res.json({ message: "OTP sent successfully" });
      } else {
        return res.status(404).json({ message: "Email not registered in the system" });
      }
    } catch (error) {
      console.error("Error sending OTP:", err);
      res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/send-otp2",async (req,res)=>{
  const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
  
    try {
      const query = `
        SELECT email FROM pharmacists WHERE email = $1
      `;
      const result = await pool.query(query, [email]);
  
      if (result.rows.length > 0) {
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query(
            "INSERT INTO otps (email,otp,expires_at) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3" ,
            [email,otp,expiresAt]
        );

        await transporter.sendMail({
            from: "seproject475@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
          });

          res.json({ message: "OTP sent successfully" });
      } else {
        return res.status(404).json({ message: "Email not registered in the system" });
      }
    } catch (error) {
      console.error("Error sending OTP:", err);
      res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Missing email or OTP" });
    }

    const result = await pool.query("SELECT otp, expires_at FROM otps WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "OTP not found. Please request again." });
    }

    const { otp: storedOtp, expires_at } = result.rows[0];

    
    if (new Date() > new Date(expires_at)) {
      await pool.query("DELETE FROM otps WHERE email = $1", [email]);
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    
    if (storedOtp.length !== otp.length) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (!crypto.timingSafeEqual(Buffer.from(storedOtp, "utf8"), Buffer.from(otp, "utf8"))) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
     
     const patientResult = await pool.query("SELECT id AS patient_id FROM patients WHERE email=$1", [email]);
      if (patientResult.rows.length === 0) {
        return res.status(400).json({ message: "No patient record found" });
      }
      const { patient_id } = patientResult.rows[0];
 
     
     const token = jwt.sign({ email, patient_id }, "puneeth@05$*", { expiresIn: "1h" });

     console.log(token);

    
    await pool.query("DELETE FROM otps WHERE email = $1", [email]);

    res.json({ message: "OTP verified successfully", token });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Something went wrong while verifying OTP. Please try again." });
  }
});


app.post("/verify-otp1", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Missing email or OTP" });
    }

    const result = await pool.query("SELECT otp, expires_at FROM otps WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "OTP not found. Please request again." });
    }

    const { otp: storedOtp, expires_at } = result.rows[0];

    
    if (new Date() > new Date(expires_at)) {
      await pool.query("DELETE FROM otps WHERE email = $1", [email]);
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    
    if (storedOtp.length !== otp.length) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (!crypto.timingSafeEqual(Buffer.from(storedOtp, "utf8"), Buffer.from(otp, "utf8"))) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const email1=email;
    
     const token1 = jwt.sign({ email1 }, "puneeth@05$*", { expiresIn: "1h" });

     console.log(token1);

    
    await pool.query("DELETE FROM otps WHERE email = $1", [email]);

    res.json({ message: "OTP verified successfully", token1 });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Something went wrong while verifying OTP. Please try again." });
  }
});

app.post("/verify-otp2", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Missing email or OTP" });
    }

    const result = await pool.query("SELECT otp, expires_at FROM otps WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "OTP not found. Please request again." });
    }

    const { otp: storedOtp, expires_at } = result.rows[0];

    
    if (new Date() > new Date(expires_at)) {
      await pool.query("DELETE FROM otps WHERE email = $1", [email]);
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    
    if (storedOtp.length !== otp.length) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (!crypto.timingSafeEqual(Buffer.from(storedOtp, "utf8"), Buffer.from(otp, "utf8"))) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const email2=email;
     const token2 = jwt.sign({ email2 }, "puneeth@05$*", { expiresIn: "1h" });

     console.log(token2);

    
    await pool.query("DELETE FROM otps WHERE email = $1", [email]);

    res.json({ message: "OTP verified successfully", token2 });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Something went wrong while verifying OTP. Please try again." });
  }
});


app.get("/get-details", authenticateToken, async (req, res) => {
  const email = req.user.email; 

  try {
      console.log("Requested Email:", email); 

      const query = `
          SELECT 
              p.id AS patient_id, 
              p.name AS patient_name, 
              p.phone AS patient_phone, 
              p.email AS patient_email, 
              p.blood_type AS patient_blood_type, 
              p.disability AS patient_disability, 
              p.father_name AS patient_father_name, 
              p.father_phone AS patient_father_phone, 
              e.id AS contact_id, 
              e.name AS contact_name, 
              e.relation AS contact_relation, 
              e.phone AS contact_phone
          FROM patients p
          LEFT JOIN emergency_contacts e ON p.id = e.patient_id
          WHERE p.email = $1
      `;

      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Patient not found" });
      }

      const patientData = {
          patient_id: result.rows[0].patient_id,
          patient_name: result.rows[0].patient_name,
          patient_phone: result.rows[0].patient_phone,
          patient_email: result.rows[0].patient_email,
          patient_blood_type: result.rows[0].patient_blood_type,
          patient_disability: result.rows[0].patient_disability,
          patient_father_name: result.rows[0].patient_father_name,
          patient_father_phone: result.rows[0].patient_father_phone,
          emergency_contacts: result.rows
              .filter(row => row.contact_id) 
              .map(row => ({
                  name: row.contact_name,
                  relation: row.contact_relation,
                  phone: row.contact_phone
              }))
      };

      console.log("Fetched Patient Data:", patientData); 

      res.json(patientData);
  } catch (err) {
      console.error("Error fetching patient details:", err);
      res.status(500).json({ message: "Internal server error" });
  }
});




app.get("/",(req,res)=>{
    res.send("Postgre is connected...");
})

app.post("/a", async (req, res) => {
    try {
        let { name, email, reason, date } = req.body; 
        console.log("Received request:", { name, email, reason, date });


        

        let patientResult = await pool.query(
            "SELECT id FROM patients WHERE email = $1",
            [email]
        );

        let patientId;

        if (patientResult.rows.length > 0) {
            patientId = patientResult.rows[0].id;
        } else {
            const newPatient = await pool.query(
                "INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING id",
                [name, email]
            );
            patientId = newPatient.rows[0].id;
        }

        const appointmentResult = await pool.query(
            "INSERT INTO appointments (patient_id,email, name, reason, date) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            [patientId,email, name, reason, date]
        );

        console.log("New appointment added:", appointmentResult.rows[0]);

        res.status(201).json({ 
            message: "Appointment booked successfully", 
            appointment: appointmentResult.rows[0] 
        });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


  
  app.post("/edit-details", authenticateToken,async (req, res) => {
    try {
        const formData  = req.body; 

        
        await pool.query(
            `UPDATE patients
             SET name = $1, 
                 phone = $2, 
                 blood_type = $3, 
                 disability = $4,
                 father_name = $5,
                 father_phone = $6
             WHERE email = $7`,
            [formData.name, formData.phone, formData.bloodType, formData.disability, formData.fatherName, formData.fatherPhone, formData.email]
        );

        
        const patientResult = await pool.query(
            `SELECT id FROM patients WHERE email = $1`,
            [formData.email]
        );

        if (patientResult.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const patientId = patientResult.rows[0].id;

        
        await pool.query(`DELETE FROM emergency_contacts WHERE patient_id = $1`, [patientId]);

        
        for (let contact of formData.emergencyContacts) {
            if (contact.name && contact.relation && contact.phone) {
                await pool.query(
                    `INSERT INTO emergency_contacts (patient_id, name, relation, phone) 
                     VALUES ($1, $2, $3, $4)`,
                    [patientId, contact.name, contact.relation, contact.phone]
                );
            }
        }

        res.status(200).json({ message: "Details updated successfully" });

    } catch (err) {
        console.error("Error updating details:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/get-appointments", async (req, res) => {
    try {
        const { date } = req.query;

        console.log("Fetching appointments for:", date);

        if (!date) {
            return res.status(400).json({ error: "Date parameter is required" });
        }

        
        const result = await pool.query(
            "SELECT id, patient_id, name, reason, date FROM appointments WHERE date = $1 AND status = 'pending'",
            [date]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/add-prescription", async (req, res) => {
    try {
        const { appointment_id, prescriptions } = req.body;

        if (!appointment_id) {
            return res.status(400).json({ error: "Appointment ID is required" });
        }

        
        const appointmentResult = await pool.query(
            "SELECT id FROM appointments WHERE id = $1 AND status = 'pending'",
            [appointment_id]
        );

        if (appointmentResult.rows.length === 0) {
            return res.status(404).json({ error: "No active appointment found for the given ID" });
        }

        
        for (const prescription of prescriptions) {
            await pool.query(
                "INSERT INTO prescriptions (appointment_id, tablet_name, quantity, morning, afternoon, night) VALUES ($1, $2, $3, $4, $5, $6)",
                [
                    appointment_id,
                    prescription.medicine,
                    prescription.quantity,
                    prescription.use.M,
                    prescription.use.A,
                    prescription.use.N,
                ]
            );
        }

       
        await pool.query("UPDATE appointments SET status = 'completed' WHERE id = $1", [appointment_id]);

        res.status(201).json({ message: "Prescriptions saved and appointment marked as completed" });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/submit-medical-certificate",authenticateToken, async (req, res) => {
    try {
        const { reason, dateFrom, dateTo } = req.body;
        const id =req.user.patient_id;

        console.log({reason,dateFrom,dateTo,id});

        
        if (!reason || !dateFrom || !dateTo ||!id) {
            return res.status(400).json({ message: "All fields are required" });
        }


        
        const insertQuery = `
            INSERT INTO medical_certificates (patient_id, reason, from_date, to_date)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;

        const insertResult = await pool.query(insertQuery, [
            id,
            reason,
            dateFrom,
            dateTo,
        ]);

        res.status(201).json({
            message: "Medical certificate request submitted successfully",
            data: insertResult.rows[0],
        });
    } catch (err) {
        console.error("Error submitting medical certificate:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/get-medical-requests", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT mc.id, p.name, mc.reason, mc.from_date, mc.to_date 
             FROM medical_certificates mc
             JOIN patients p ON mc.patient_id = p.id
             WHERE mc.approval_status = 'pending'`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching medical requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


  app.post("/approve-request", async (req, res) => {
    const { id ,today} = req.body;
    try {
      await pool.query("UPDATE medical_certificates SET approval_status = 'approved',approved_date=$2 WHERE id = $1", [id,today]);
      res.json({ message: "Request approved successfully" });
    } catch (error) {
      console.error("Error approving request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  app.get("/get-appointments-prescriptions",authenticateToken, async (req, res) => {
    try {
        const  patient_id  = req.user.patient_id;
        console.log(patient_id);

        if (!patient_id) {
            return res.status(400).json({ error: "Patient ID is required" });
        }

        const appointmentsQuery = `
            SELECT a.id, a.date, a.reason, p.id AS prescription_id
            FROM appointments a
            LEFT JOIN prescriptions p ON a.id = p.appointment_id
            WHERE a.patient_id = $1
            AND a.status = 'completed'
            ORDER BY a.date DESC;
        `;

        const result = await pool.query(appointmentsQuery, [patient_id]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/get-medical-certificates",authenticateToken, async (req, res) => {
    try {
        const patient_id  = req.user.patient_id; 

        if (!patient_id) {
            return res.status(400).json({ error: "Patient ID is required" });
        }

        const certificatesQuery = `
            SELECT id, reason, from_date, to_date, approval_status
            FROM medical_certificates
            WHERE patient_id = $1
            ORDER BY from_date DESC;
        `;

        const result = await pool.query(certificatesQuery, [patient_id]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching medical certificates:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/download-prescription/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const prescriptionQuery = `
            SELECT a.name AS patient_name, a.reason, a.date, 
                   p.tablet_name, p.quantity, p.morning, p.afternoon, p.night
            FROM prescriptions p
            JOIN appointments a ON p.appointment_id = a.id
            WHERE p.id = $1;
        `;

        const result = await pool.query(prescriptionQuery, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        const prescription = result.rows[0];

        
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=prescription_${id}.pdf`);

        doc.pipe(res);
        doc.fontSize(18).text("Prescription", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Patient: ${prescription.patient_name}`);
        doc.text(`Date: ${prescription.date}`);
        doc.text(`Reason: ${prescription.reason}`);
        doc.moveDown();
        doc.text(`Tablet: ${prescription.tablet_name}`);
        doc.text(`Quantity: ${prescription.quantity}`);
        doc.text(`Morning: ${prescription.morning ? "✔" : "✖"}`);
        doc.text(`Afternoon: ${prescription.afternoon ? "✔" : "✖"}`);
        doc.text(`Night: ${prescription.night ? "✔" : "✖"}`);
        doc.end();
    } catch (error) {
        console.error("Error downloading prescription:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/download-certificate/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const certificateQuery = `
            SELECT reason, from_date, to_date
            FROM medical_certificates
            WHERE id = $1;
        `;

        const result = await pool.query(certificateQuery, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        const certificate = result.rows[0];

        
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=certificate_${id}.pdf`);

        doc.pipe(res);
        doc.fontSize(18).text("Medical Certificate", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Reason: ${certificate.reason}`);
        doc.text(`From: ${certificate.from_date}`);
        doc.text(`To: ${certificate.to_date}`);
        doc.moveDown();
        doc.text("This is a valid medical certificate issued by NITC Health Care Center.", {
            align: "center",
        });
        doc.end();
    } catch (error) {
        console.error("Error downloading certificate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/get-today-appointments", async (req, res) => {
    try {
      const { date } = req.query; 
      const query = `
        SELECT a.id, a.date, a.reason, a.name, p.id AS prescription_id
        FROM appointments a
        LEFT JOIN prescriptions p ON a.id = p.appointment_id
        WHERE a.date = $1 AND a.pharmacist_status = 'pending' AND a.status='completed'
        ORDER BY a.date DESC;
      `;
      
      const { rows } = await pool.query(query, [date]);
      res.json(rows);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  

  app.get("/get-prescription/:id", async (req, res) => {
    try {
      const prescriptionId = req.params.id;
      const query = "SELECT * FROM prescriptions WHERE  appointment_id = $1";
      const { rows } = await pool.query(query, [prescriptionId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Prescription not found" });
      }
  
      res.json(rows); 
    } catch (error) {
      console.error("Error fetching prescription:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/get-threshold", async (req, res) => {
    try {
      const result = await pool.query("SELECT threshold_value FROM threshold LIMIT 1");
      if (result.rows.length > 0) {
        res.json({ threshold_value: result.rows[0].threshold_value });
      } else {
        res.json({ threshold_value: 0 });
      }
    } catch (error) {
      console.error("Error fetching threshold:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/update-threshold", async (req, res) => {
    try {
      const { threshold_value } = req.body;
      await pool.query("UPDATE threshold SET threshold_value = $1", [threshold_value]);
      res.json({ message: "Threshold updated successfully" });
    } catch (error) {
      console.error("Error updating threshold:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/get-shortage-medicines", async (req, res) => {
    try {
      const thresholdResult = await pool.query("SELECT threshold_value FROM threshold LIMIT 1");
      const threshold = thresholdResult.rows.length > 0 ? thresholdResult.rows[0].threshold_value : 0;
  
      const result = await pool.query("SELECT * FROM medicines WHERE quantity < $1", [threshold]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching shortage medicines:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/search-medicine", async (req, res) => {
    try {
      const { name } = req.query;
      const result = await pool.query(
        "SELECT * FROM medicines WHERE LOWER(medicine_name) = LOWER($1) LIMIT 1",
        [name]
      );
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Medicine not found" });
      }
    } catch (error) {
      console.error("Error searching medicine:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get("/medicine-suggestions", async (req, res) => {
    try {
      const query = req.query.query;
  
      if (!query) {
        return res.json([]);
      }
  
      const result = await pool.query(
        "SELECT DISTINCT medicine_name FROM medicines WHERE medicine_name ILIKE $1 LIMIT 10",
        [`${query}%`]
      );
  
      res.json(result.rows); 
    } catch (error) {
      console.error("Error fetching medicine suggestions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/check-email", async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });
  
    try {
      const query = `
        SELECT email FROM pharmacists WHERE email = $1
      `;
      const result = await pool.query(query, [email]);
  
      if (result.rows.length > 0) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/update-pharmacist-status/:id", async (req, res) => {
    const appointmentId = req.params.id;
  
    try {
        
        const prescriptionQuery = `
            SELECT tablet_name, quantity 
            FROM prescriptions 
            WHERE appointment_id = $1`;
        const { rows: medicines } = await pool.query(prescriptionQuery, [appointmentId]);

       
        for (const medicine of medicines) {
            const checkMedicineQuery = `SELECT quantity FROM medicines WHERE medicine_name = $1`;
            const { rows: existingMedicine } = await pool.query(checkMedicineQuery, [medicine.tablet_name]);

            if (existingMedicine.length > 0) {
                
                const updateMedicineQuery = `
                    UPDATE medicines 
                    SET quantity = GREATEST(quantity - $1, 0) 
                    WHERE medicine_name = $2`;
                await pool.query(updateMedicineQuery, [medicine.quantity, medicine.tablet_name]);
            }
        }

        
        const updateStatusQuery = `
            UPDATE appointments 
            SET pharmacist_status = 'completed' 
            WHERE id = $1
            RETURNING *;
        `;
        const { rowCount } = await pool.query(updateStatusQuery, [appointmentId]);

        if (rowCount === 0) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        
        res.json({ success: true, message: "Medicines dispensed, stock updated, and pharmacist status updated successfully" });

    } catch (error) {
        console.error("Error updating medicine stock or pharmacist status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

  


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
