import { Link } from "wouter";
import { Fingerprint, ChartLine, PlugIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BusinessSection() {
  return (
    <div id="for-businesses" className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              For Businesses
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Protect your brand and customers by registering your products on our blockchain network. Reduce counterfeit sales and build consumer trust.
            </p>
            <div className="mt-10 space-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Fingerprint className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Product Registration</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Register your products on our blockchain with a unique digital fingerprint that can't be replicated.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <ChartLine className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Analytics Dashboard</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Track product verifications with detailed analytics about where and when your products are being verified.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <PlugIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">E-commerce Integration</h3>
                  <p className="mt-2 text-base text-gray-500">
                    API integration for your website or marketplace listings to showcase verified authentic products.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 relative">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center">
                  <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <Play className="h-10 w-10 text-primary" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/auth?tab=register&type=business">
                <Button className="w-full">
                  Register Your Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
