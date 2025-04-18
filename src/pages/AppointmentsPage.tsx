import { CalendarClock, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import { FileText, User, Folder, Download, Printer, LogOut } from "lucide-react";

import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AppointmentsPage = () => {
    const navigate = useNavigate();

    // Sample appointment data (matching the screenshot)
    const appointments = [
        { id: 1, name: "Sai Teja", reason: "Fever", date: "2023-10-15" },
        { id: 2, name: "Jane Smith", reason: "Cold & Cough", date: "2023-10-15" },
        { id: 3, name: "Sam Johnson", reason: "Headache", date: "2023-10-15" },
        { id: 4, name: "Maria Garcia", reason: "Back Pain", date: "2023-10-16" },
        { id: 5, name: "Robert Chen", reason: "Allergic Reaction", date: "2023-10-16" },
    ];

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
                                    <SidebarMenuButton tooltip="Requests" onClick={()=>{navigate('/j')}}>
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
                                                {appointments.map((appointment) => (
                                                    <TableRow key={appointment.id} className="hover:bg-gray-50 border-t">
                                                        <TableCell className="font-medium border-r">{appointment.id}</TableCell>
                                                        <TableCell className="border-r">{appointment.name}</TableCell>
                                                        <TableCell className="border-r">{appointment.reason}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="px-3 py-1 text-sm"
                                                                onClick={()=>navigate("/i")}
                                                            >
                                                                Prescription
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
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


