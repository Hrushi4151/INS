export default function CallToAction() {
  return (
    <section id="contact" className="py-20 bg-[#A594F9] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Internship Journey?</h2>
        <p className="text-xl mb-8">Sign up now and take the first step towards your dream career.</p>
        <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full max-w-sm bg-white text-[#A594F9] rounded"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#CDC1FF] text-[#A594F9] rounded font-semibold hover:bg-[#CDC1FF]/90 transition-colors"
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  )
}

