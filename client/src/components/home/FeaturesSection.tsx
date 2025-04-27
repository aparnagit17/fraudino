import { Brain, Group, QrCode, History, Code, Smartphone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      name: "AI-Powered Image Analysis",
      description: "Our deep learning models analyze product images with 97% accuracy, examining logos, textures, and product-specific features.",
      icon: Brain,
    },
    {
      name: "Blockchain Verification",
      description: "Products registered on our blockchain have an immutable record of authenticity that cannot be forged or tampered with.",
      icon: Group,
    },
    {
      name: "Multi-Method Scanning",
      description: "Supports QR code, NFC, and RFID scanning for additional verification methods beyond visual inspection.",
      icon: QrCode,
    },
    {
      name: "Scan History",
      description: "Keep a record of all your product scans with detailed Trust Scores and verification results for future reference.",
      icon: History,
    },
    {
      name: "API Integration",
      description: "E-commerce platforms can integrate our API to automatically verify products before they're listed for sale.",
      icon: Code,
    },
    {
      name: "Mobile Ready",
      description: "Fully responsive web app and native mobile applications available for iOS and Android for on-the-go verification.",
      icon: Smartphone,
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Cutting-Edge Technology
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform combines multiple technologies to provide the most accurate counterfeit detection.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
