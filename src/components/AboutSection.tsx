import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about-section" className="py-16 bg-nitc-light-gray/30">

    <section className="py-16 bg-nitc-light-gray/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Services
        </h2>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Emergency Care */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">Emergency Care</CardTitle>
              <p className="text-gray-500">24/7 emergency medical assistance</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our emergency services are available round the clock to address
                urgent medical needs of NITC students, faculty, and staff.
              </p>
            </CardContent>
          </Card>

          {/* General Medicine */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">General Medicine</CardTitle>
              <p className="text-gray-500">Comprehensive healthcare services</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our team of qualified doctors provides consultations,
                diagnoses, and treatments for a wide range of general health
                conditions.
              </p>
            </CardContent>
          </Card>

          {/* Pharmacy */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 bg-white border-nitc-light-blue">
            <CardHeader>
              <CardTitle className="text-nitc-blue">Pharmacy</CardTitle>
              <p className="text-gray-500">On-campus medication dispensary</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our pharmacy provides prescribed medications and over-the-counter
                drugs to meet the healthcare needs of the NITC community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Section */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Our Doctors
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-8">
          {/* Senior Medical Officer */}
          <Card className="shadow-md bg-white p-4 flex flex-col items-center">
            <img
              src="/public/Bensey.jpg" // Replace with actual image path
              alt="Dr. Bensy Stephen"
              width={150}
              height={200}
              className="rounded-md"
            />
            <CardContent className="text-center mt-3">
              <p className="text-sm text-blue-600 font-semibold">
                Senior Medical Officer
              </p>
              <p className="font-semibold">Wg Cdr Dr Bensy Stephen</p>
              <p className="text-gray-600">MBBS MD</p>
            </CardContent>
          </Card>

          {/* Medical Officer - Dr. Arya */}
          <Card className="shadow-md bg-white p-4 flex flex-col items-center">
            <img
              src="/public/Arya.jpg" // Replace with actual image path
              alt="Dr. Arya S"
              width={150}
              height={200}
              className="rounded-md"
            />
            <CardContent className="text-center mt-3">
              <p className="text-sm text-gray-600 font-semibold">
                Medical Officer
              </p>
              <p className="font-semibold">Dr. Arya S</p>
              <p className="text-gray-600">MBBS</p>
            </CardContent>
          </Card>

          {/* Medical Officer - Dr. Jim Starlin */}
          <Card className="shadow-md bg-white p-4 flex flex-col items-center">
            <img
              src="/public/Jim.jpg" // Replace with actual image path
              alt="Dr. Jim Starlin J.M"
              width={150}
              height={200}
              className="rounded-md"
            />
            <CardContent className="text-center mt-3">
              <p className="text-sm text-gray-600 font-semibold">
                Medical Officer
              </p>
              <p className="font-semibold">Dr. Jim Starlin J. M</p>
              <p className="text-gray-600">MBBS</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </section>
  );
};

export default AboutSection;
