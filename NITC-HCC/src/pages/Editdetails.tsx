import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

const EditDetailsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bloodType: "",
    disability: "",
    fatherName: "",
    fatherPhone: "",
    emergencyContacts: [{ name: "", relation: "", phone: "" }, { name: "", relation: "", phone: "" }],
  });

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, redirecting to login.");
      navigate("/b");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/b");
      return;
    }

    const email = decodedToken.email;

    setFormData((prevData) => ({ ...prevData, email }));

    const fetchPatientDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch patient details");

        const patientData = await response.json();
        setFormData({
          name: patientData.patient_name || "",
          phone: patientData.patient_phone || "",
          email: patientData.patient_email || email,
          bloodType: patientData.patient_blood_type || "",
          disability: patientData.patient_disability || "",
          fatherName: patientData.patient_father_name || "",
          fatherPhone: patientData.patient_father_phone || "",
          emergencyContacts: patientData.emergency_contacts.length
            ? patientData.emergency_contacts
            : [{ name: "", relation: "", phone: "" }, { name: "", relation: "", phone: "" }],
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [navigate]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedContacts = [...formData.emergencyContacts];
      updatedContacts[index][name] = value;
      setFormData({ ...formData, emergencyContacts: updatedContacts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/b");

    try {
      const response = await fetch("http://localhost:5000/edit-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to edit details");

      toast({ title: "Your details have been updated!" });
      navigate("/d");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa] pt-14">
        <DashboardHeader page="edit-details" />
        <div className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["name", "phone", "email", "bloodType", "disability"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-gray-500 capitalize">{field}</label>
                    <Input 
                      type="text" 
                      name={field} 
                      value={formData[field]} 
                      onChange={handleChange} 
                      readOnly={field === "email"} 
                      className={field === "email" ? "bg-gray-200 cursor-not-allowed" : ""}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["fatherName", "fatherPhone"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-gray-500 capitalize">
                      {field.replace("father", "Father's ")}
                    </label>
                    <Input type="text" name={field} value={formData[field]} onChange={handleChange} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["name", "relation", "phone"].map((field) => (
                      <div key={field}>
                        <label className="text-sm font-medium text-gray-500 capitalize">{field}</label>
                        <Input type="text" name={field} value={contact[field]} onChange={(e) => handleChange(e, index)} />
                      </div>
                    ))}
                  </div>
                  {index < formData.emergencyContacts.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end pb-12">
            <Button onClick={handleConfirm} size="lg">Confirm</Button>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default EditDetailsPage;
