import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, FileText, User, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

const MedicalCertificatePage = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/b", { replace: true }); // Redirect if no token
    } 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "You are not authenticated. Please log in again.",
        variant: "destructive",
      });
      navigate("/b"); // Redirect to login
      return;
    }
  
    // Construct the payload
    const requestBody = {
      reason,
      dateFrom: dateFrom ? dateFrom.toISOString().split("T")[0] : null, // Convert to YYYY-MM-DD
      dateTo: dateTo ? dateTo.toISOString().split("T")[0] : null,
    };
  
    try {
      const response = await fetch("http://localhost:5000/submit-medical-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit medical certificate");
      }
  
      // Reset form fields after successful submission
      setReason("");
      setDateFrom(undefined);
      setDateTo(undefined);
  
      toast({
        title: "Submitted",
        description: "Medical Certificate request is submitted.",
      });
  
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit the request. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  

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
                  <SidebarMenuButton tooltip="Details" onClick={() => navigate('/d')}>
                    <User />
                    <span>Details</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Records" onClick={() => navigate('/e')}>
                    <Folder />
                    <span>Records</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Medical Certificate">
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
                <h1 className="text-2xl font-bold mb-2">Medical Certificate Request</h1>
                <p className="text-gray-500">Apply for a medical certificate</p>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Certificate Application Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason for Medical Certificate
                      </label>
                      <Textarea
                        id="reason"
                        placeholder="Please describe your reason for requesting a medical certificate"
                        className="min-h-24"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
                          Date From
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateFrom && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateFrom ? format(dateFrom, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
                          Date To
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateTo && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateTo ? format(dateTo, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                              disabled={(date) => dateFrom ? date < dateFrom : false}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                        disabled={loading} // Disable button when loading
                      >
                        {loading ? "Submitting..." : "Apply"}
                      </Button>
                    </div>
                  </form>
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

export default MedicalCertificatePage;
