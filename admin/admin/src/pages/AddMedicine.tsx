import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { UserPlus, Stethoscope, Pill, Trash2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([{ id: 1, name: "", quantity: "" }]);
  const [suggestions, setSuggestions] = useState<{ [key: number]: string[] }>({});
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchSuggestions = async (query: string, id: number) => {
    if (query.length < 1) {  
        setSuggestions((prev) => ({ ...prev, [id]: [] }));
        return;
    }

    try {
        const response = await fetch(`http://localhost:5001/medicine-suggestions?query=${query}`);
        let data = await response.json();

        
        data = data.filter((medicine: string) => medicine.toLowerCase().startsWith(query.toLowerCase()));

        setSuggestions((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
        console.error("Error fetching medicine suggestions:", err);
    }
};


  const handleChange = (id: number, field: string, value: string) => {
    setMedicines(medicines.map(medicine => (medicine.id === id ? { ...medicine, [field]: value } : medicine)));
    if (field === "name") {
      setActiveInput(id); 
      fetchSuggestions(value, id);
    }
  };

  const handleSelectSuggestion = (id: number, name: string) => {
    setMedicines(medicines.map(medicine => (medicine.id === id ? { ...medicine, name } : medicine)));
    setSuggestions((prev) => ({ ...prev, [id]: [] })); 
    setActiveInput(null);
  };

  const handleAddRow = () => {
    setMedicines([...medicines, { id: Date.now(), name: "", quantity: "" }]);
  };

  const handleDeleteRow = (id: number) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
    setSuggestions((prev) => {
      const newSuggestions = { ...prev };
      delete newSuggestions[id];
      return newSuggestions;
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting Medicines:", medicines);

    try {
      const response = await fetch("http://localhost:5001/add-medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicines }),
      });

      const data = await response.json();
      toast({
        title: "Updated",
        description:"Successfully updated Medicines.",
      });

      setMedicines([{ id: 1, name: "", quantity: "" }]);
      setSuggestions({});
    } catch (err) {
      console.error("Error submitting medicines:", err);
      toast({
        title: "Error",
        description: err || "Failed to upload medicines.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page1="reset-password" />

        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Add Doctor" onClick={() => navigate("/add-doctors")}>
                    <UserPlus />
                    <span>Add Doctor</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Add Pharmacist" onClick={() => navigate("/add-pharmacists")}>
                    <Stethoscope />
                    <span>Add Pharmacist</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Add Medicines">
                    <Pill />
                    <span>Add Medicines</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset>
            <div className="p-6 w-full">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle>Add Medicines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2 text-left">Medicine Name</th>
                          <th className="border border-gray-300 p-2 text-left">Quantity</th>
                          <th className="border border-gray-300 p-2 text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map(medicine => (
                          <tr key={medicine.id} className="border border-gray-300">
                            <td className="border border-gray-300 p-2 relative">
                              <input
                                type="text"
                                value={medicine.name}
                                onChange={e => handleChange(medicine.id, "name", e.target.value)}
                                placeholder="Enter medicine name"
                                className="w-full p-2 border rounded"
                                onFocus={() => setActiveInput(medicine.id)}
                                onBlur={() => setTimeout(() => setActiveInput(null), 200)} // Hide after clicking outside
                              />
                              {activeInput === medicine.id && suggestions[medicine.id] && suggestions[medicine.id].length > 0 && (
                                <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto z-10">
                                  {suggestions[medicine.id].map((suggestion, index) => (
                                    <li key={index} className="p-2 cursor-pointer hover:bg-gray-100" onMouseDown={() => handleSelectSuggestion(medicine.id, suggestion)}>
                                      {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </td>
                            <td className="border border-gray-300 p-2">
                              <input type="number" value={medicine.quantity} onChange={e => handleChange(medicine.id, "quantity", e.target.value)} placeholder="Quantity" className="w-full p-2 border rounded" />
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                              <Button variant="destructive" size="icon" onClick={() => handleDeleteRow(medicine.id)}>
                                <Trash2 size={20} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button className="w-1/3" onClick={handleAddRow}>Add Medicine</Button>
                    <Button className="w-1/3" onClick={handleSubmit}>Submit</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AddMedicine;
