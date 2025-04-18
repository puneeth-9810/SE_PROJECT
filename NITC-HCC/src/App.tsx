import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppointmentPage from "./pages/AppointmentPage";
import PrescriptionLookup from "./pages/PrescriptionLookup"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import RecordsDashboard from "./pages/RecordsDashboard";
import MedicalCertificatePage from "./pages/MedicalCertificates";
import DoctorLoginPage from "./pages/DoctorLoginPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import RequestsPage from "./pages/RequestsPage";
import GiveawayMedicinesPage from "./pages/Giveaway";
import MedicineList from "./pages/MedicineList";
import PharmacistPrescription from "./pages/PharmacistPrescription";
import EditDetailsPage from "./pages/Editdetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a" element={<AppointmentPage />} />
          <Route path="/b" element={<PrescriptionLookup />} />
          <Route path="/c" element={<LoginPage />} />
          <Route path ="/d" element ={<DashboardPage/>}/>
          <Route path="/g" element={<DoctorLoginPage />} />
          <Route path="/e"  element={<RecordsDashboard/>}></Route>
          <Route path="/f"  element={<MedicalCertificatePage/>}></Route>
          <Route path="/h"  element={<AppointmentsPage/>}/>
          <Route path="/i"  element={<PrescriptionPage/>}/>
          <Route path="/j"  element={<RequestsPage/>}/>
          <Route path="/k"  element={<GiveawayMedicinesPage/>}/>
          <Route path ='/l' element={<MedicineList/>}/>
          <Route path ='/m' element ={<PharmacistPrescription/>}/>
          <Route path ='/n' element={<EditDetailsPage/>}/>
         {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
