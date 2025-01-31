const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content:
      "The Internship Management System made it so easy to find and apply for relevant internships. I secured my dream internship thanks to this platform!",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Marketing Major",
    content:
      "I love how I can track all my applications in one place. The company profiles helped me prepare for interviews and stand out as a candidate.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Engineering Student",
    content:
      "The mentorship feature connected me with amazing industry professionals. Their guidance was invaluable in shaping my career path.",
    avatar: "ER",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#A594F9]">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#E5D9F2] rounded-lg shadow-md p-6 border border-[#A594F9]/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#CDC1FF] rounded-full flex items-center justify-center text-[#A594F9] font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-[#A594F9]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-700">&ldquo;{testimonial.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

