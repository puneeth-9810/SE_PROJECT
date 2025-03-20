import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { FileText, User, Folder, LogOut } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  // Mock user data
  const navigate= useNavigate();

  const userData = {
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john.doe@nitc.ac.in",
    bloodType: "O+",
    disability: "None",
    fatherName: "Robert Doe",
    fatherPhone: "+91 9876543211",
    emergencyContacts: [
      { name: "Jane Doe", relation: "Spouse", phone: "+91 9876543212" },
      { name: "Mary Smith", relation: "Friend", phone: "+91 9876543213" },
    ],
  };



  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#f5f7fa]">
        <DashboardHeader page="b"/>
        <div className="flex flex-1 min-h-screen pt-8 mt-12 pb-6 mb-10">
          {/* Sidebar */}
          <Sidebar variant="inset" side="left" collapsible="icon" className="fixed h-full z-0">
            <SidebarContent className="pt-8 mt-12">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={true} 
                    tooltip="Details"
                  >
                    <User />
                    <span >Details</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Records"
                    onClick={()=>navigate('/e')}
                  >
                    <Folder />
                    <span onClick={()=>navigate('/e')}>Records</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Medical Certificate"
                    onClick={()=>navigate('/f')}
                  >
                    <FileText />
                    <span onClick={()=>navigate('/f')}>Medical Certificate</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main content */}
          <SidebarInset >
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Patient Dashboard</h1>
                <p className="text-gray-500">View and manage your health information</p>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-base">{userData.name}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="text-base">{userData.phone}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-base">{userData.email}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Blood Type</p>
                        <p className="text-base">{userData.bloodType}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Disability Status</p>
                        <p className="text-base">{userData.disability}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Guardian Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">Father's Name</p>
                      <p className="text-base">{userData.fatherName}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">Father's Phone Number</p>
                      <p className="text-base">{userData.fatherPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  {userData.emergencyContacts.map((contact, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name</p>
                          <p className="text-base">{contact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Relation</p>
                          <p className="text-base">{contact.relation}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-base">{contact.phone}</p>
                        </div>
                      </div>
                      {index < userData.emergencyContacts.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
        <Footer/>
      </div>
    </SidebarProvider>
    
  );
};

export default DashboardPage;