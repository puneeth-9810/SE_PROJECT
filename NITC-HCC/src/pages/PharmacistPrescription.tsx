import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { FileText, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PharmacistPrescription = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); 
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);

 

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

  // Fetch prescription details from API
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-prescription/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMedicines(data);
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [id]);

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
                  <SidebarMenuButton tooltip="Medicines List" onClick={() => navigate(`/l?id=${encodeURIComponent(id)}`)}>
                    <Pill size={20} />
                    <span>Medicines List</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-col w-full px-8">
            <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-12 font-semibold text-gray-700 border-r">S.No</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Medicine</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-r">Quantity</TableHead>
                      <TableHead className="font-semibold text-gray-700">Dosage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.length > 0 ? (
                      medicines.map((medicine, index) => (
                        <TableRow key={medicine.id} className="hover:bg-gray-50 border-t">
                          <TableCell className="font-medium border-r">{index + 1}</TableCell>
                          <TableCell className="border-r">{medicine.tablet_name}</TableCell>
                          <TableCell className="border-r">{medicine.quantity}</TableCell>
                          <TableCell className="flex gap-2 border-r">
                            {[
                              { label: "M", state: medicine.morning },
                              { label: "A", state: medicine.afternoon },
                              { label: "N", state: medicine.night },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className={`px-2 py-1 rounded-md text-white text-sm font-semibold ${
                                  item.state ? "bg-green-500" : "bg-gray-300"
                                }`}
                              >
                                {item.label}
                              </div>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                          No prescription found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Back Button */}
            <Button variant="outline" className="mt-4 w-20" onClick={() => navigate('/k')}>
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
