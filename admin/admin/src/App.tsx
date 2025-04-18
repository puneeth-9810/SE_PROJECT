
import AdminLogin from "./pages/AdminLogin";
import AddDoctors from "./pages/AddDoctors";
import AddPharmacists from "./pages/AddPharmacists";
import AddMedicine from "./pages/AddMedicine";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => (
    <>
    <TooltipProvider>
      <Toaster />
      <Sonner />
    <Toaster />
    <Router>
        <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/add-doctors" element={<AddDoctors />} />
        <Route path="/add-pharmacists" element={<AddPharmacists />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </Router>
    </TooltipProvider>
    </>
);

export default App;
