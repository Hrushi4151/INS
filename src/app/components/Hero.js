import Image from "next/image"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#202020] to-[#646464] text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Streamline Your Internship Journey</h1>
          <p className="text-xl mb-6">
            Connect with top companies, manage applications, and kickstart your career with our Internship Management
            System.
          </p>
          <button className="px-6 py-3 bg-[#CDC1FF] text-[#A594F9] rounded-lg text-lg font-semibold hover:bg-[#CDC1FF]/90 transition-colors">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Students using the Internship Management System"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

