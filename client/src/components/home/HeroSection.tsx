import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function HeroSection() {
  return (
    <div id="home" className="pt-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
              <span className="block">AI-Powered</span>
              <span className="block text-primary">Counterfeit Detection</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Protect yourself from counterfeit products with our cutting-edge AI and blockchain verification technology. Scan, verify, and shop with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row">
              <Link href="/auth?tab=register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl bg-gray-100">
                <svg
                  className="w-full h-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Check className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-600">Trust Score: 98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
