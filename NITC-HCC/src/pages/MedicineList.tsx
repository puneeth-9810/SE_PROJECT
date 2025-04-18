import { useState, useEffect } from "react";
import { FileText, Pill, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const MedicineList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchedMedicine, setSearchedMedicine] = useState(null);
  const [threshold, setThreshold] = useState(null);
  const [shortageMedicines, setShortageMedicines] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

 

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
    fetchThreshold();
    fetchShortageMedicines();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetchMedicineSuggestions();
  }, [searchQuery]);

  // Fetch the stored threshold from the database
  const fetchThreshold = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-threshold");
      const data = await response.json();
      setThreshold(data.threshold_value);
    } catch (error) {
      console.error("Error fetching threshold:", error);
    }
  };

  // Fetch medicines with quantity below the threshold
  const fetchShortageMedicines = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-shortage-medicines");
      const data = await response.json();
      setShortageMedicines(data);
    } catch (error) {
      console.error("Error fetching shortage medicines:", error);
    }
  };

  // Fetch medicine suggestions based on user input
  const fetchMedicineSuggestions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/medicine-suggestions?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching medicine suggestions:", error);
    }
  };

  // Handle selecting a suggested medicine
  const handleSuggestionClick = async (medicineName) => {
    setSearchQuery(medicineName);
    setSuggestions([]); // Hide the dropdown immediately
  
    try {
      const response = await fetch(`http://localhost:5000/search-medicine?name=${medicineName}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedMedicine(data);
      } else {
        setSearchedMedicine(null);
      }
    } catch (error) {
      console.error("Error searching medicine:", error);
    }
  };
  

  // Search for a medicine in the database
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`http://localhost:5000/search-medicine?name=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedMedicine(data);
      } else {
        setSearchedMedicine(null);
      }
      setSuggestions([]); // Ensure dropdown disappears after search
    } catch (error) {
      console.error("Error searching medicine:", error);
    }
  };

  // Update the threshold value in the database
  const updateThreshold = async () => {
    if (threshold === null || threshold === "") return;
    setIsUpdating(true);
    try {
      const response = await fetch("http://localhost:5000/update-threshold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threshold_value: threshold }),
      });

      if (response.ok) {
        fetchThreshold();
        fetchShortageMedicines();
      }
    } catch (error) {
      console.error("Error updating threshold:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-dropdown")) {
        setSuggestions([]);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page="c" />
        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/k')}>
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

          <div className="flex flex-col w-full px-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Medicines List</h1>
              {id && (
                <Button 
                  variant="default" 
                  onClick={() => navigate(`/m?id=${encodeURIComponent(id)}`)}
                >
                  Go to Prescription
                </Button>
              )}
            </div>

            {/* Search Bar with Suggestions */}
            <div className="flex items-center w-full mb-4 relative">
              <Input
                type="text"
                placeholder="Search medicine..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" onClick={handleSearch} className="ml-2">
                <Search size={20} />
              </Button>
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 shadow-md max-h-40 overflow-auto top-full mt-1">
                  {suggestions.map((medicine, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onMouseDown={(e) => e.preventDefault()} // Prevents losing focus before setting state
                      onClick={() => handleSuggestionClick(medicine.medicine_name)}
                    >
                      {medicine.medicine_name}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {searchedMedicine && (
              <Card className="p-4 mb-4 bg-white shadow">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium border-r">1</TableCell>
                      <TableCell className="border-r">{searchedMedicine.medicine_name}</TableCell>
                      <TableCell>{searchedMedicine.quantity}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            )}

            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Shortage Medicines:</h2>
              <div className="flex items-center gap-2">
                <label className="font-medium">Threshold:</label>
                <Input
                  type="number"
                  value={threshold ?? ""}
                  onChange={(e) => setThreshold(e.target.value)}
                  onBlur={() => setThreshold(Number(threshold) || 0)}
                  className="w-20"
                />
                <Button onClick={updateThreshold} disabled={isUpdating} className="bg-blue-500 text-white">
                  {isUpdating ? "Updating..." : "Set"}
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shortageMedicines.length > 0 ? (
                    shortageMedicines.map((medicine, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{medicine.medicine_name}</TableCell>
                        <TableCell>{medicine.quantity}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500">
                        No shortage medicines.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default MedicineList;
