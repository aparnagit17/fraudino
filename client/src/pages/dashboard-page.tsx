import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadSection } from "@/components/dashboard/UploadSection";
import { ScanHistory } from "@/components/dashboard/ScanHistory";
import { QRScanner } from "@/components/dashboard/QRScanner";
import { BlockchainVerifier } from "@/components/dashboard/BlockchainVerifier";
import { type Scan } from "@shared/schema";
import { Loader2, Scan as ScanIcon, History, QrCode, Database } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("scan");
  
  const { data: scans, isLoading, error } = useQuery<Scan[]>({
    queryKey: ["/api/scans"],
    enabled: !!user,
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}</h1>
            <p className="mt-2 text-lg text-gray-600">
              {user?.userType === "business" 
                ? "Register and manage your products to protect your brand from counterfeits." 
                : "Verify product authenticity and protect yourself from counterfeits."}
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full mb-8">
              <TabsTrigger value="scan" className="flex items-center gap-2">
                <ScanIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Scan Product</span>
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">QR Scan</span>
              </TabsTrigger>
              <TabsTrigger value="blockchain" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Blockchain Verify</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan">
              <UploadSection />
            </TabsContent>
            
            <TabsContent value="qr">
              <QRScanner />
            </TabsContent>
            
            <TabsContent value="blockchain">
              <BlockchainVerifier />
            </TabsContent>
            
            <TabsContent value="history">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">Error loading scan history</p>
                </div>
              ) : (
                <ScanHistory scans={scans || []} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
