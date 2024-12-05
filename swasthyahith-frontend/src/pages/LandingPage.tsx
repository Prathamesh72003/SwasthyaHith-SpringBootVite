import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Shield, Stethoscope, History, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LandingPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010048] to-[#010048]/70">
      <nav className="px-14 py-8 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">SwasthyaHith</div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Products</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Sign In <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#010048] border border-white/10">
              <DropdownMenuItem onClick={() => console.log('Doctor Sign In')}>
                <Stethoscope className="mr-2 h-4 w-4" />
                <span>Sign In as Doctor</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Patient Sign In')}>
                <Shield className="mr-2 h-4 w-4" />
                <span>Sign In as Patient</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white text-[#010048] hover:bg-white/90">
                Sign Up <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#010048] border border-white/10">
              <DropdownMenuItem onClick={() => console.log('Doctor Sign Up')}>
                <Stethoscope className="mr-2 h-4 w-4" />
                <span>Sign Up as Doctor</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Patient Sign Up')}>
                <Shield className="mr-2 h-4 w-4" />
                <span>Sign Up as Patient</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <svg className="w-4 h-4 text-blue-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span className="text-sm text-gray-300">Trusted by Over 1000+ Healthcare Providers</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Revolutionize Your
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Healthcare Experience
          </span>
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Unlock seamless, secure, and instant healthcare management. Connect with doctors, access prescriptions,
          and maintain comprehensive medical records with ease.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-[#8B5DFF] hover:bg-[#6A42C2] text-white px-8 py-6 text-lg">
            Start Now
          </Button>
          <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 text-lg">
            Explore Platform
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-[#8B5DFF]" />}
            title="Secure Records"
            description="Your medical records are encrypted and securely stored, ensuring complete privacy and confidentiality."
          />
          <FeatureCard
            icon={<Stethoscope className="w-8 h-8 text-[#8B5DFF]" />}
            title="Digital Prescriptions"
            description="Receive and manage digital prescriptions directly through our platform, eliminating paper waste."
          />
          <FeatureCard
            icon={<History className="w-8 h-8 text-[#8B5DFF]" />}
            title="Treatment History"
            description="Access your complete medical history and track your healthcare journey over time."
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <div className="bg-white/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

