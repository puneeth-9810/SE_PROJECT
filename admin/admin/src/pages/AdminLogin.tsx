import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [name, setname] = useState(""); 
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // Error message state

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid login credentials");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/add-doctors");

    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      {/* Background Image with Overlay */}
      <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: "url('/image/hc.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#D3E4FD] to-[#e6f7ff] text-black py-4 shadow-md flex justify-center items-center gap-4 relative z-10">
        <img
          src="hi.jpg"
          alt="Logo"
          className="h-10" // Adjust size
        />
        <h1 className="text-xl font-bold">NITC Health Care Center</h1>
      </header>

      {/* Login Card */}
      <div className="flex-grow flex justify-center items-center relative z-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>} {/* Error Message */}

          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setname(e.target.value)} // Update state
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
            onClick={handleLogin} // Calls handleLogin on click
          >
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3 relative z-10">
        Designed and Developed by Saiteja
      </footer>
    </div>
  );
};

export default AdminLogin;
