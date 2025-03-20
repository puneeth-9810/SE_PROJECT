import { useState } from "react";
import { CalendarClock, ClipboardList, Pill, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const GiveawayMedicinesPage = () => {
    const navigate=useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, name: "Sai Teja", reason: "Fever", prescription: "" },
    { id: 2, name: "Jane Smith", reason: "Cold & Cough", prescription: "" },
    { id: 3, name: "Sam Johnson", reason: "Headache", prescription: "" },
  ]);

  // Update prescription input
  const updatePrescription = (index: number, value: string) => {
    const updatedRequests = requests.map((req, i) =>
      i === index ? { ...req, prescription: value } : req
    );
    setRequests(updatedRequests);
  };

  // Remove request when updated
  const handleUpdate = (index: number) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
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
                  <SidebarMenuButton isActive={true} tooltip="Appointments">
                  <FileText size={20} className="text-gray-500" />
                    <span>Giveaway</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Requests" onClick={()=>navigate('/l')}>
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
                      <TableHead className="font-semibold text-gray-700 border-r">Prescription</TableHead>
                      <TableHead className="w-16 font-semibold text-gray-700">Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 border-t">
                        <TableCell className="font-medium border-r">{index + 1}</TableCell>
                        <TableCell className="border-r">{request.name}</TableCell>
                        <TableCell className="border-r">{request.reason}</TableCell>
                        <TableCell className="border-r">
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-3 py-1 text-sm"
                            onClick={()=>navigate("/m")}
                        >
                        Prescription
                        </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdate(index)}
                            className="flex items-center"
                          >
                            <RefreshCcw size={16} className="mr-1" />
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
