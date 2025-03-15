import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-nitc-light-gray/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Emergency Care */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">Emergency Care</CardTitle>
              <CardDescription>24/7 emergency medical assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our emergency services are available round the clock to address urgent medical needs of NITC students, faculty, and staff.
              </p>
            </CardContent>
          </Card>
          
          {/* General Medicine */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">General Medicine</CardTitle>
              <CardDescription>Comprehensive healthcare services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our team of qualified doctors provides consultations, diagnoses, and treatments for a wide range of general health conditions.
              </p>
            </CardContent>
          </Card>
          
          {/* Pharmacy */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">Pharmacy</CardTitle>
              <CardDescription>On-campus medication dispensary</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our pharmacy provides prescribed medications and over-the-counter drugs to meet the healthcare needs of the NITC community.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
