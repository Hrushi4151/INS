import Image from "next/image"
import Link from "next/link"
// import { button } from "@/components/ui/button"
import { FaGraduationCap, FaUsers, FaChartBar, FaCalendarAlt, FaArrowRight } from "react-icons/fa"

export default function LandingPage() {
  return (
    <div className="flex flex-col  bg-white text-gray-900">
      <header className="bg-black text-white ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center w-full md:w-[80vw]">
          <Link href="/" className="flex items-center space-x-2">
            <FaGraduationCap size={24} />
            <span className="text-xl font-bold">EduIntern</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="hover:text-gray-300 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="hover:text-gray-300 transition-colors">
              Success Stories
            </Link>
            <Link href="#partners" className="hover:text-gray-300 transition-colors">
              Partners
            </Link>
            <Link href="#contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </nav>
          <button variant="outline" className="bg-white text-black hover:bg-gray-200 px-3 py-2 rounded-lg">
            Student Login
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 py-20   ">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center w-full md:w-[80vw]">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Elevate Your College Internship Program</h1>
              <p className="text-xl mb-8 text-gray-700">
                Connect students with real-world opportunities and empower their career journeys.
              </p>
              <button size="lg" className="bg-black text-white hover:bg-gray-800  px-3 py-2 rounded-lg">
                Get Started <FaArrowRight className=" mx-auto" />
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://miro.medium.com/v2/resize:fit:961/1*jfuCDilCyzkiL-oQnwOcbQ.jpeg"
                alt="College students"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20  ">
          <div className="container mx-auto px-4 w-full md:w-[80vw] ">
            <h2 className="text-3xl font-bold text-center mb-12">Empowering Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: FaGraduationCap,
                  title: "Curriculum Integration",
                  description: "Seamlessly align internships with academic programs.",
                },
                {
                  icon: FaUsers,
                  title: "Employer Partnerships",
                  description: "Foster relationships with top companies and organizations.",
                },
                {
                  icon: FaChartBar,
                  title: "Performance Tracking",
                  description: "Monitor and evaluate student progress in real-time.",
                },
                {
                  icon: FaCalendarAlt,
                  title: "Scheduling & Reminders",
                  description: "Efficiently manage timelines and deadlines for all parties.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <feature.icon className="w-12 h-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="bg-gray-100 py-20  ">
          <div className="container mx-auto px-4 w-full md:w-[80vw] ">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <blockquote className="mb-4">
                  <p className="text-lg italic">
                    "EduIntern transformed our internship program. It's user-friendly and has significantly improved our
                    placement rates."
                  </p>
                </blockquote>
                <cite className="flex items-center">
                  <Image
                    src="/avatar-1.svg"
                    alt="Dr. Emily Chen"
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">Dr. Emily Chen</div>
                    <div className="text-sm text-gray-600">Career Services Director</div>
                  </div>
                </cite>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <blockquote className="mb-4">
                  <p className="text-lg italic">
                    "Thanks to EduIntern, I landed my dream internship at a top tech company. The platform made the
                    entire process smooth and stress-free."
                  </p>
                </blockquote>
                <cite className="flex items-center">
                  <Image src="/avatar-2.svg" alt="Alex Johnson" width={40} height={40} className="rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Alex Johnson</div>
                    <div className="text-sm text-gray-600">Computer Science Student</div>
                  </div>
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20  ">
          <div className="container mx-auto px-4 w-full md:w-[80vw] ">
            <h2 className="text-3xl font-bold text-center mb-12">Our Industry Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {["partner1", "partner2", "partner3", "partner4", "partner5"].map((partner, index) => (
                <Image
                  key={index}
                  src={`/file.svg`}
                  alt={`Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-black text-white py-20  ">
          <div className="container px-4 text-center w-full md:w-[80vw] mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Internship Program?</h2>
            <p className="text-xl mb-8">Join leading colleges in providing unparalleled internship experiences.</p>
            <button size="lg" className="bg-white text-black hover:bg-gray-200  px-3 py-2 rounded-lg">
              Request a Demo <FaArrowRight className="mx-auto" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container px-4 py-8  w-full md:w-[80vw] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <FaGraduationCap size={24} className="text-black" />
              <span className="ml-2 text-lg font-semibold">EduIntern</span>
            </div>
            <nav className="flex flex-wrap justify-center space-x-4">
              <Link href="#" className="text-sm text-gray-600 hover:text-black">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-black">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-black">
                Contact Us
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-black">
                Support
              </Link>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} EduIntern. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

