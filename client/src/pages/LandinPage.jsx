import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Zap, Palette, Code } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            VibeUI
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-purple-500 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-400 hover:text-purple-500 transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-purple-500 transition-colors">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <button className="text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md">
              Log in
            </button>
          </Link>
          <Link to="/auth">
            <button className="bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 px-4 py-2 rounded-md">
              Sign up
            </button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Design Beautiful UI Components That Match Your Brand
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              VibeUI combines the power of AI with your brand identity to create custom UI components that feel uniquely
              yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <button
                  className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-6 rounded-xl text-lg font-medium focus:ring-2 focus:ring-purple-500"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-16 w-full max-w-5xl mx-auto relative">
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              <div className="aspect-[16/9] relative">
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="VibeUI Dashboard Preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-gray-800 p-4 rounded-xl shadow-lg rotate-3 hidden md:block border border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <div className="w-3 h-3 rounded-full bg-purple-700"></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gray-800 p-4 rounded-xl shadow-lg -rotate-3 hidden md:block border border-gray-700">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-400">Custom Components</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Why Designers & Developers Love VibeUI
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Brand-Matched Design</h3>
              <p className="text-gray-400">
                Every component automatically adapts to your brand colors, typography, and style preferences.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI-Powered Customization</h3>
              <p className="text-gray-400">
                Describe what you want in plain language and watch as AI transforms your components in real-time.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Instant Code Generation</h3>
              <p className="text-gray-400">
                Get production-ready code for React, Vue, or HTML/CSS that you can copy and paste directly into your
                project.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-12 mt-20 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                VibeUI
              </span>
            </div>
            <div className="text-gray-500 text-sm">© {new Date().getFullYear()} VibeUI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}