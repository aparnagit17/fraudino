import { ScanIcon, CircleOff, ShieldCheck } from "lucide-react";

export function HowItWorksSection() {
  return (
    <div id="how-it-works" className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">How It Works</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Verify in Three Simple Steps
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our AI-powered technology makes counterfeit detection easy, fast, and reliable.
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="relative">
              <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Scan or Upload</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Scan a product using your smartphone camera or upload product images. We support QR codes, NFC, and RFID scanning.
                </p>
                <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
                  <div className="h-48 w-full bg-gray-200 rounded-md flex items-center justify-center">
                    <ScanIcon className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 relative">
              <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">AI Analysis</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Our powerful AI models analyze logos, barcodes, textures, and product features to detect counterfeit indicators.
                </p>
                <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
                  <div className="relative h-48 w-full bg-gray-200 rounded-md">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center">
                      <div className="p-4 bg-white bg-opacity-90 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CircleOff className="h-5 w-5 animate-spin text-primary" />
                          <span className="text-sm font-medium">Analyzing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 relative">
              <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Instant Verification</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Receive a detailed Trust Score with blockchain verification. Shop confidently with immediate results.
                </p>
                <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
                  <div className="p-2 rounded-md bg-green-500 bg-opacity-10 border border-green-500 mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ShieldCheck className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-500">Authentic Product</h3>
                        <p className="text-xs text-gray-700">Verified on blockchain</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Logo Verification</span>
                      <span className="text-sm font-medium text-green-500">Passed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Texture Analysis</span>
                      <span className="text-sm font-medium text-green-500">Passed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Overall Trust Score</span>
                      <span className="text-sm font-medium text-green-500">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
