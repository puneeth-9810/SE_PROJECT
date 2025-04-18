import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router-dom";
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { FileText, User, Folder } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    patient_name: "",
    patient_phone: "",
    patient_blood_type: "",
    patient_disability: "",
    patient_father_name: "",
    patient_father_phone: "",
    emergency_contacts: [{ name: "", relation: "", phone: "" }],
  });

  
  

  const [email, setEmail] = useState<string | undefined>();
const [p_id, setPid] = useState<string | undefined>();
const isAuthorized = useRef(false);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("token"); 
    };

    window.addEventListener("beforeunload", handleUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/b", { replace: true }); // Redirect to login if no token
  } else {
    const decodedToken = jwtDecode<{ email: string }>(token);
    setEmail(decodedToken.email);
    fetchDetails();
  }
}, []);

  
  const fetchDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/b");
  
    try {
      const response = await fetch(`http://localhost:5000/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) return navigate("/b");
  
      const data = await response.json();
      setUserData({
        patient_name: data.patient_name,
        patient_phone: data.patient_phone,
        patient_blood_type: data.patient_blood_type,
        patient_disability: data.patient_disability,
        patient_father_name: data.patient_father_name,
        patient_father_phone: data.patient_father_phone,
        emergency_contacts: data.emergency_contacts,
      });
      setPid(data.patient_id)
      
    } catch (error) {
      console.error("Error fetching details:", error);
      navigate("/b");
    }
  };


  
  

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page="b"/>
        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          {/* Sidebar */}
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Details">
                    <User />
                    <span>Details</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Records" onClick={() => navigate('/e')}>
                    <Folder />
                    <span>Records</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Medical Certificate" onClick={() => navigate('/f')}>
                    <FileText />
                    <span>Medical Certificate</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main content */}
          <SidebarInset>
            <div className="p-6">
              {/* Header section with Edit Details button on the right */}
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Patient Dashboard</h1>
                <Button onClick={() => navigate('/n')} size="sm">
                  Edit Details
                </Button>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-base">{userData.patient_name}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="text-base">{userData.patient_phone}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-base">{email}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Blood Type</p>
                        <p className="text-base">{userData.patient_blood_type}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Disability Status</p>
                        <p className="text-base">{userData.patient_disability}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Guardian Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">Father's Name</p>
                      <p className="text-base">{userData.patient_father_name}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">Father's Phone Number</p>
                      <p className="text-base">{userData.patient_father_phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.emergency_contacts.map((contact, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p className="text-base">{contact.name}</p> 
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Relation</p>
                            <p className="text-base">{contact.relation}</p> 
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone Number</p>
                            <p className="text-base">{contact.phone}</p> 
                          </div>
                        </div>
                        {index < userData.emergency_contacts.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>


            </div>
          </SidebarInset>
        </div>
        <Footer />
      </div>
    </SidebarProvider>

  );
};

export default DashboardPage;
