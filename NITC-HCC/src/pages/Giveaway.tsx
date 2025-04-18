import { useEffect, useState } from "react";
import { CalendarClock, ClipboardList, Pill, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
} from "@/components/ui/sidebar";

import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { jwtDecode } from "jwt-decode";

const GiveawayMedicinesPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toLocaleDateString("en-CA");

  

  useEffect(() => {
            const token = localStorage.getItem("token2");
            if (!token) {
              navigate("/c", { replace: true }); // Redirect to login if no token
            } else {
              const decodedToken = jwtDecode<{ email2: string }>(token);
              if(!decodedToken.email2)
              {
                  navigate("/c", { replace: true });
              }
            }
          }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-today-appointments?date=${today}`);
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Remove the row when marked as completed (UI only)
  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/update-pharmacist-status/${id}`, {
        method: "PUT",
      });
  
      if (response.ok) {
        // Remove row from UI after successful update
        setRequests((prev) => prev.filter((req) => req.id !== id));
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  // Function to download prescription
  const viewPrescription = (prescriptionId) => {
    if (prescriptionId) {
      navigate(`/m?id=${encodeURIComponent(prescriptionId)}`);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page="c"/>
        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          {/* Sidebar */}
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Giveaway">
                    <FileText size={20} className="text-gray-500" />
                    <span>Giveaway</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Medicines List" onClick={() => navigate('/l')}>
                    <Pill size={20} />
                    <span>Medicines List</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-col w-full px-8">
            <h1 className="text-2xl font-bold mb-4">Giveaway Medicines</h1>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-12 font-semibold text-gray-700 border-r">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Reason</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r text-center">
                        Prescription
                      </TableHead>
                      <TableHead className="w-24 font-semibold text-gray-700 text-center">Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length > 0 ? (
                      requests.map((request, index) => (
                        <TableRow key={request.id} className="hover:bg-gray-50 border-t">
                          <TableCell className="font-medium border-r">{index + 1}</TableCell>
                          <TableCell className="border-r">{request.name}</TableCell>
                          <TableCell className="border-r">{request.reason}</TableCell>
                          <TableCell className="border-r text-center">
                            {request.prescription_id ? (
                              <Button
                              variant="outline"
                              size="sm"
                              className="px-3 py-1 text-sm flex items-center"
                              onClick={() => viewPrescription(request.id)}
                            >
                              <FileText size={16} className="mr-1" />
                              View Prescription
                            </Button>
                            ) : (
                              "No Prescription"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsCompleted(request.id)}
                              className="flex items-center"
                            >
                              Completed
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No appointments for today.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default GiveawayMedicinesPage;
