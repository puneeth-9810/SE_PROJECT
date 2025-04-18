
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
const RecordsDashboard = () => {
    const navigate=useNavigate();
  // Mock records data
  const records = [
    {
      id: 1,
      date: "2023-06-12",
      reason: "Annual Health Checkup",
      certificate: "Health Certificate",
    },
    {
      id: 2,
      date: "2023-08-25",
      reason: "Fever Treatment",
      certificate: "Medical Certificate",
    },
    {
      id: 3,
      date: "2023-10-08",
      reason: "COVID-19 Vaccination",
      certificate: "Vaccination Certificate",
    },
    {
      id: 4,
      date: "2024-01-15",
      reason: "Eye Examination",
      certificate: "Medical Report",
    },
    {
      id: 5,
      date: "2024-03-22",
      reason: "Dental Checkup",
      certificate: "Dental Report",
    },
  ];

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
                  <SidebarMenuButton 
                    tooltip="Details"
                    onClick={()=>navigate('/d')}
                  >
                    
                      <User />
                      <span>Details</span>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={true}
                    tooltip="Records"
                  >
                    
                      <Folder />
                      <span>Records</span>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Medical Certificate"
                    onClick={()=>navigate('/f')}
                  >
                    
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

              <Card>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-16 font-semibold text-gray-700">S.No</TableHead>
                          <TableHead className="font-semibold text-gray-700">Date</TableHead>
                          <TableHead className="font-semibold text-gray-700">Reason/Certificate</TableHead>
                          <TableHead className="font-semibold text-gray-700 text-right">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {records.map((record) => (
                          <TableRow key={record.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{record.id}</TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.reason}</p>
                                <p className="text-sm text-muted-foreground">{record.certificate}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Download size={15} />
                                  <span>Download</span>
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                  <Printer size={15} />
                                  <span>Print</span>
                                </Button>
                              </div>
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

export default RecordsDashboard;