import { useState } from "react";
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
} from "@/components/ui/sidebar";

import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
const RequestsPage = () => {
    const navigate=useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, name: "Sai Teja", reason: "Fever" },
    { id: 2, name: "John Doe", reason: "Cold" },
  ]);

  // Remove request when approved
  const approveRequest = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
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
                  <SidebarMenuButton tooltip="Appointments" onClick={()=>{navigate('/h')}}>
                    <CalendarClock size={20} />
                    <span>Appointments</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Requests">
                    <ClipboardList size={20} />
                    <span>Requests</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Requests Table */}
          <div className="flex flex-col w-full px-8">
            <h1 className="text-2xl font-bold mb-4">Requests</h1>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-12 font-semibold text-gray-700 border-r">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Reason</TableHead>
                      <TableHead className="w-16 font-semibold text-gray-700">Grant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length > 0 ? (
                      requests.map((request, index) => (
                        <TableRow key={request.id} className="hover:bg-gray-50 border-t">
                          <TableCell className="font-medium border-r">{index + 1}</TableCell>
                          <TableCell className="border-r">{request.name}</TableCell>
                          <TableCell className="border-r">{request.reason}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="default"
                              onClick={() => approveRequest(request.id)}
                            >
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No pending requests
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

export default RequestsPage;
