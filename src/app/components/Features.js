import { Search, Building, FileText, Users } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Find Internships",
    description: "Browse through a curated list of internships from top companies across various industries.",
  },
  {
    icon: Building,
    title: "Company Profiles",
    description: "Access detailed information about companies, their culture, and internship programs.",
  },
  {
    icon: FileText,
    title: "Application Tracking",
    description: "Keep track of your internship applications, deadlines, and interview schedules in one place.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with alumni and industry professionals for guidance and career advice.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-[#E5D9F2]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#A594F9]">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-[#A594F9]/20">
              <div className="mb-4">
                <feature.icon className="h-10 w-10 text-[#A594F9]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#A594F9]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

