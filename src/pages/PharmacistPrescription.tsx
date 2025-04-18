import { useState } from "react";
import { FileText, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const PharmacistPrescription = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Dolo 650", quantity: "1/2 Sheet", use: "" },
  ]);

  // Handle medicine use selection
  const handleUseSelection = (index: number, useType: string) => {
    const updatedMedicines = medicines.map((med, i) =>
      i === index ? { ...med, use: useType } : med
    );
    setMedicines(updatedMedicines);
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
            <h1 className="text-2xl font-bold mb-4">Prescription :-</h1>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-12 font-semibold text-gray-700 border-r">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Medicine</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Quantity</TableHead>
                      <TableHead className="font-semibold text-gray-700">Use</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((medicine, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 border-t">
                        <TableCell className="font-medium border-r">{index + 1}</TableCell>
                        <TableCell className="border-r">{medicine.name}</TableCell>
                        <TableCell className="border-r">{medicine.quantity}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button
                            variant={medicine.use === "M" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleUseSelection(index, "M")}
                          >
                            M
                          </Button>
                          <Button
                            variant={medicine.use === "A" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleUseSelection(index, "A")}
                          >
                            A
                          </Button>
                          <Button
                            variant={medicine.use === "N" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleUseSelection(index, "N")}
                          >
                            N
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Back Button */}
            <Button variant="outline" className="mt-4 w-20" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default PharmacistPrescription;
