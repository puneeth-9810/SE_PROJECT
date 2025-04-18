import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { FileText, User, Folder, Download } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RecordsDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [id,setID]=useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState<"appointments" | "certificates">("appointments");
  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/b", { replace: true });
    } else {
      const decodedToken: { patient_id: string } = jwtDecode(token);
      fetchRecords();
      setID(decodedToken.patient_id);
      console.log(decodedToken.patient_id);
    }
  }, []);
  
  const fetchRecords = async () => {
    const token = localStorage.getItem("token");
    try {
      const resAppointments = await fetch(
        `http://localhost:5000/get-appointments-prescriptions`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const resCertificates = await fetch(
        `http://localhost:5000/get-medical-certificates`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (resAppointments.ok) setAppointments(await resAppointments.json());
      if (resCertificates.ok) setCertificates(await resCertificates.json());
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Download Prescription
  const downloadPrescription = (id) => {
    window.open(`http://localhost:5000/download-prescription/${id}`, "_blank");
  };

  // Download Medical Certificate
  const downloadCertificate = (id) => {
    window.open(`http://localhost:5000/download-certificate/${id}`, "_blank");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page="b" />
        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          {/* Sidebar */}
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Details" onClick={() => navigate('/d')}>
                    <User />
                    <span>Details</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Records">
                    <Folder />
                    <span>Records</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Medical Certificate" onClick={() => navigate(`/f`)}>
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
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">Medical Records</h1>
      <p className="text-gray-500">View and download your medical history</p>
    </div>

    {/* Toggle Buttons */}
    <div className="mb-4 flex gap-4">
      <Button
        variant={selectedTab === "appointments" ? "default" : "outline"}
        onClick={() => setSelectedTab("appointments")}
      >
        Appointments & Prescriptions
      </Button>
      <Button
        variant={selectedTab === "certificates" ? "default" : "outline"}
        onClick={() => setSelectedTab("certificates")}
      >
        Medical Certificates
      </Button>
    </div>

    {/* Conditional Table Render */}
    {selectedTab === "appointments" ? (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold pb-4">Appointments & Prescriptions</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16 font-semibold text-gray-700">S.No</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Prescription</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((app, index) => (
                    <TableRow key={app.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{app.reason}</TableCell>
                      <TableCell className="flex justify-center">
                        {app.prescription_id ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => downloadPrescription(app.prescription_id)}
                          >
                            <Download size={15} />
                            <span>Download</span>
                          </Button>
                        ) : (
                          "No Prescription"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      No appointments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    ) : (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold pb-4">Medical Certificates</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16 font-semibold text-gray-700">S.No</TableHead>
                  <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                  <TableHead className="font-semibold text-gray-700">From</TableHead>
                  <TableHead className="font-semibold text-gray-700">To</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.length > 0 ? (
                  certificates.map((cert, index) => (
                    <TableRow key={cert.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{cert.reason}</TableCell>
                      <TableCell>{cert.from_date}</TableCell>
                      <TableCell>{cert.to_date}</TableCell>
                      <TableCell>{cert.approval_status}</TableCell>
                      <TableCell className="flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => downloadCertificate(cert.id)}
                        >
                          <Download size={15} />
                          <span>Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No medical certificates found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    )}
  </div>
</SidebarInset>

        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default RecordsDashboard;
