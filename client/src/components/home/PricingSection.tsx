import { Link } from "wouter";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <div id="pricing" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-5 text-xl text-gray-500 max-w-3xl mx-auto">
            Choose the right plan for your needs. From individual consumers to large enterprises, we have you covered.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-5xl lg:mx-auto">
          {/* Free Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Consumer</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for individual shoppers wanting to verify purchases.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Free</span>
              </p>
              <Link href="/auth?tab=register">
                <Button variant="outline" className="mt-8 w-full">
                  Sign up for free
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">10 product scans per month</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Basic AI analysis</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">QR code scanning</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Basic scan history</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="border border-primary rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6 bg-primary-50 rounded-t-lg">
              <h3 className="text-lg leading-6 font-medium text-primary">Premium</h3>
              <p className="mt-4 text-sm text-gray-500">For frequent shoppers and small businesses.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <Link href="/auth?tab=register&plan=premium">
                <Button className="mt-8 w-full">
                  Start Premium
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Unlimited product scans</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Advanced AI analysis</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">QR code, NFC & RFID scanning</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Detailed scan history</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Priority customer support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Business Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-500">For manufacturers and large businesses.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Custom</span>
              </p>
              <Link href="/auth?tab=register&plan=enterprise">
                <Button variant="outline" className="mt-8 w-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Everything in Premium</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Bulk product registration</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">API integration</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Advanced analytics dashboard</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Dedicated account manager</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Custom integration support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
