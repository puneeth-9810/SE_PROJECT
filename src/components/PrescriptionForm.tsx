
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Upload } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";

type Medicine = {
  id: number;
  name: string;
  quantity: string;
  timing: string[];
};

const PrescriptionForm = ({ patientName }: { patientName: string }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: "", quantity: "", timing: [] }
  ]);
  const { toast } = useToast();
  const form = useForm();

  const addMedicine = () => {
    const newId = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
    setMedicines([...medicines, { id: newId, name: "", quantity: "", timing: [] }]);
  };

  const removeMedicine = (id: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
    }
  };

  const updateMedicine = (id: number, field: keyof Medicine, value: any) => {
    setMedicines(medicines.map(medicine => 
      medicine.id === id ? { ...medicine, [field]: value } : medicine
    ));
  };

  const handleSubmit = () => {
    // Here you would normally send the data to a backend
    console.log("Submitting prescription:", medicines);
    
    // Display success toast
    toast({
      title: "Prescription Uploaded",
      description: `Prescription for ${patientName} has been successfully uploaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Prescription for {patientName}</h2>
        </div>
        
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">S.No</TableHead>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Usage Timing</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicines.map((medicine, index) => (
                    <TableRow key={medicine.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={medicine.name}
                          onChange={(e) => updateMedicine(medicine.id, "name", e.target.value)}
                          placeholder="Enter medicine name"
                          className="max-w-[200px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={medicine.quantity}
                          onChange={(e) => updateMedicine(medicine.id, "quantity", e.target.value)}
                          placeholder="e.g., 1 tablet"
                          className="max-w-[120px]"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup 
                          type="multiple" 
                          variant="outline"
                          value={medicine.timing}
                          onValueChange={(value) => updateMedicine(medicine.id, "timing", value)}
                        >
                          <ToggleGroupItem value="M" aria-label="Morning">
                            M
                          </ToggleGroupItem>
                          <ToggleGroupItem value="A" aria-label="Afternoon">
                            A
                          </ToggleGroupItem>
                          <ToggleGroupItem value="N" aria-label="Night">
                            N
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicine(medicine.id)}
                          disabled={medicines.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={addMedicine}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Medicine
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> Upload Prescription
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PrescriptionForm;