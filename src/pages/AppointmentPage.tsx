import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  date: z.date({ required_error: "Please select a date" }),
  reason: z.string().min(5, { message: "Please provide a reason (at least 5 characters)" }),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentPage = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      reason: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    toast({
      title: "Appointment Booked!",
      description: `Thank you ${data.name}, your appointment is confirmed for ${format(data.date, "PPP")}.`,
    });
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-10">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Book Your Appointment
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center">
            {/* Appointment Form */}
            <Card className="col-span-2 shadow-lg rounded-lg bg-white">
              <CardHeader className="bg-blue-100 rounded-t-lg py-4">
                <CardTitle className="text-xl text-gray-900 text-center">
                  Appointment Details
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} className="rounded-md shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} className="rounded-md shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date Picker */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Appointment Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full rounded-md shadow-sm">
                                  {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Reason for Appointment */}
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Appointment</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your symptoms or reason for visit"
                              {...field}
                              className="rounded-md shadow-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 text-lg font-semibold text-white rounded-md shadow-md">
                      Book Appointment
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Available Timings - Further Reduced Height */}
            <div className="flex flex-col">
              <Card className="shadow-md rounded-lg bg-gray-50">
                <CardHeader className="bg-gray-100 rounded-t-lg py-2 text-center">
                  <CardTitle className="text-lg text-gray-900 flex items-center justify-center gap-2">
                    <Clock size={18} /> Available Timings
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-3 text-center text-sm space-y-1">
                  <p className="font-semibold text-gray-800">Mon - Fri</p>
                  <p className="text-gray-600">9:00 AM - 5:00 PM</p>

                  <p className="font-semibold text-gray-800">Saturday</p>
                  <p className="text-gray-600">9:00 AM - 1:00 PM</p>

                  <p className="font-semibold text-gray-800">Sunday</p>
                  <p className="text-gray-600">9:00 AM - 11:00 AM</p>

                  <div className="mt-2 bg-red-50 p-2 rounded-md border border-red-200 text-xs">
                    <p className="font-semibold text-red-700 flex items-center gap-1">
                      <Phone size={16} /> Emergency Services
                    </p>
                    <p className="text-red-600">Available 24/7</p>
                    <p className="text-red-600">Contact: 999-888-7777</p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Quote - Aligned Right */}
              <p className="text-gray-700 italic text-left mt-4 pr-2">
                "An apple a day <br/> keeps the doctor away"
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppointmentPage;
