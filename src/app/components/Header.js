import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white border-b border-[#A594F9]/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#A594F9]">
          IMS
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#features" className="hover:text-[#A594F9] transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-[#A594F9] transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-[#A594F9] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="space-x-2">
          <button className="px-4 py-2 border border-[#A594F9] text-[#A594F9] rounded hover:bg-[#A594F9] hover:text-white transition-colors">
            Log In
          </button>
          <button className="px-4 py-2 bg-[#A594F9] text-white rounded hover:bg-[#A594F9]/90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}

