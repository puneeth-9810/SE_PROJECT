import { useState,useEffect } from "react";
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
import { jwtDecode } from "jwt-decode";

const RequestsPage = () => {
    const navigate=useNavigate();
  const [requests, setRequests] = useState([]);

  

  useEffect(() => {
    const token = localStorage.getItem("token1");
    if (!token) {
      navigate("/g", { replace: true }); // Redirect to login if no token
    } else {
      const decodedToken = jwtDecode<{ email1: string }>(token);
      if(!decodedToken.email1)
      {
          navigate("/g", { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-medical-requests");
        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        setRequests(data); // Store fetched requests in state
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const today = new Date().toLocaleDateString("en-CA"); 

  // Remove request when approved
  const approveRequest = async (id: number) => {
    try {
      const response = await fetch("http://localhost:5000/approve-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id ,today}),
      });

      if (!response.ok) throw new Error("Failed to approve request");

      // Remove approved request from UI
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error approving request:", error);
    }
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
                      <TableHead className="font-semibold text-gray-700">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                      <TableHead className="font-semibold text-gray-700">From</TableHead>
                      <TableHead className="font-semibold text-gray-700">To</TableHead>
                      <TableHead className="font-semibold text-gray-700">Approve</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length > 0 ? (
                      requests.map((request, index) => (
                        <TableRow key={request.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>{request.reason}</TableCell>
                          <TableCell>{request.from_date}</TableCell>
                          <TableCell>{request.to_date}</TableCell>
                          <TableCell>
                            <Button onClick={() => approveRequest(request.id)}>Approve</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
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
