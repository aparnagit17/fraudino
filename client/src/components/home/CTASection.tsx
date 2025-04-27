import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block text-blue-100">Join thousands of verified users today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/auth?tab=register">
              <Button variant="secondary" size="lg">
                Get started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="#contact">
              <Button variant="outline" size="lg" className="bg-primary-700 hover:bg-primary-800 text-white border-primary-700">
                Learn more
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
