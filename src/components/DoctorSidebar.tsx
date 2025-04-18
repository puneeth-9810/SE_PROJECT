
import { CalendarClock, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

type DoctorSidebarProps = {
  activeSection: "appointments" | "requests";
  onSectionChange: (section: "appointments" | "requests") => void;
};

const DoctorSidebar = ({ activeSection, onSectionChange }: DoctorSidebarProps) => {
  const navigate = useNavigate();

  const handleSectionChange = (section: "appointments" | "requests") => {
    onSectionChange(section);
    if (section === "appointments") {
      navigate("/appointments");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Sidebar className="h-full border-r" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "appointments"}
                  onClick={() => handleSectionChange("appointments")}
                >
                  <CalendarClock size={20} />
                  <span>Appointments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "requests"}
                  onClick={() => handleSectionChange("requests")}
                >
                  <ClipboardList size={20} />
                  <span>Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DoctorSidebar;