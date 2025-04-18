import { useState } from "react";
import { FileText, Pill, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const MedicineList = () => {
    const navigate=useNavigate();
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Citizen", quantity: "5 sheets" },
  ]);

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
                  <SidebarMenuButton onClick={()=>{navigate('/k')}}>
                    <FileText size={20} className="text-gray-500" />
                    <span>Giveaway</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true}>
                    <Pill size={20} />
                    <span>Medicines List</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-col w-full px-8">
            <h1 className="text-2xl font-bold mb-4">Medicines List</h1>

            {/* Search Bar */}
            <div className="flex items-center space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Search medicine..."
                className="w-full"
              />
              <Button variant="outline">
                <Search size={20} />
              </Button>
            </div>

            {/* Medicine Shortage Table */}
            <h2 className="text-lg font-semibold mb-2">Shortage Medicines:</h2>
            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-12 font-semibold text-gray-700 border-r">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((medicine, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 border-t">
                        <TableCell className="font-medium border-r">{index + 1}</TableCell>
                        <TableCell className="border-r">{medicine.name}</TableCell>
                        <TableCell>{medicine.quantity}</TableCell>
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

export default MedicineList;
