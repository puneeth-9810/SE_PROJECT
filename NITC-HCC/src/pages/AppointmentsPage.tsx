import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, ClipboardList } from "lucide-react";
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
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { jwtDecode } from "jwt-decode";

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    
    

    useEffect(() => {
      const token = localStorage.getItem("token1");
      if (!token) {
        navigate("/g", { replace: true });
         console.log(1);
      } else {
        const decodedToken = jwtDecode<{ email1: string }>(token);
        if(!decodedToken.email1)
        {
            navigate("/g", { replace: true });
            console.log(2);
        }
      }
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            const today = new Date().toLocaleDateString("en-CA"); // Get current date in YYYY-MM-DD format
            try {
                const response = await fetch(`http://localhost:5000/get-appointments?date=${today}`);
                if (!response.ok) throw new Error("Failed to fetch appointments");
                
                const data = await response.json();

                setAppointments(data);

            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const handlePrescription = (id) => {
        navigate(`/i?id=${encodeURIComponent(id)}`);
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
                <DashboardHeader page="g"/>
                <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
                    {/* Sidebar */}
                    <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
                        <SidebarContent className="pt-8 mt-12">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={true} tooltip="Appointments">
                                        <CalendarClock size={20} />
                                        <span>Appointments</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Requests" onClick={() => navigate('/j')}>
                                        <ClipboardList size={20} />
                                        <span>Requests</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarContent>
                    </Sidebar>

                    {/* Main content */}
                    <SidebarInset>
                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold mb-2">Appointments</h1>
                            </div>

                            <Card>
                                <div className="p-6">
                                    <div className="overflow-x-auto">
                                        <Table className="border border-gray-300">
                                            <TableHeader className="bg-gray-50">
                                                <TableRow>
                                                    <TableHead className="w-16 font-semibold text-gray-700 border-r">S.No</TableHead>
                                                    <TableHead className="font-semibold text-gray-700 border-r">Name</TableHead>
                                                    <TableHead className="font-semibold text-gray-700 border-r">Reason</TableHead>
                                                    <TableHead className="font-semibold text-gray-700 text-center">Prescription</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {appointments.length > 0 ? (
                                                appointments.map((appointment, index) => (
                                                    <TableRow key={appointment.id} className="hover:bg-gray-50 border-t">
                                                        <TableCell className="font-medium border-r">{index + 1}</TableCell> {/* Display index + 1 instead of database ID */}
                                                        <TableCell className="border-r">{appointment.name}</TableCell>
                                                        <TableCell className="border-r">{appointment.reason}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="px-3 py-1 text-sm"
                                                                onClick={()=>handlePrescription(appointment.id)}
                                                            >
                                                                Prescription
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-4">
                                                        No appointments for today
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>

                                        </Table>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </SidebarInset>
                </div>
                <Footer />
            </div>
        </SidebarProvider>
    );
};

export default AppointmentsPage;
