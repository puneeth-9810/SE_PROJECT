
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
  date: z.date({
    required_error: "Please select a date",
  }),
  otp: z.string().length(6, { message: "Please enter the 6-digit OTP" })
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      otp: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    toast({
      title: "Appointment Booked!",
      description: `Thank you ${data.name}, your appointment is confirmed for ${format(data.date, "PPP")}`,
    });
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Book Your Appointment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Appointment Form */}
            <Card className="col-span-2 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">Appointment Details</CardTitle>
                <CardDescription>Fill in your information to book an appointment</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
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
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Appointment Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#33C3F0] hover:bg-[#1EAEDB] transition-colors py-6 text-lg font-medium"
                    >
                      Book Appointment
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Available Timings */}
            <Card className="shadow-md bg-gray-50">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <Clock size={20} /> Available Timings
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-semibold">Saturday</p>
                    <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-semibold">Sunday</p>
                    <p className="text-gray-600">Closed</p>
                  </div>
                  
                  <div className="mt-6 bg-red-50 p-4 rounded-md border border-red-100">
                    <p className="font-semibold flex items-center gap-2 text-red-700">
                      <Phone size={18} /> Emergency Services
                    </p>
                    <p className="text-red-600 mt-1">Available 24/7</p>
                    <p className="text-red-600 mt-1">Contact: 999-888-7777</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <div className="bg-white py-8 text-center italic text-gray-600">
        "An apple a day keeps the doctor away"
      </div>
      
      <Footer />
    </div>
  );
};

export default AppointmentPage;