import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  ArrowDownToLine, 
  Share2, 
  Info, 
  AlertTriangle 
} from "lucide-react";
import { getTrustScoreColor, getTrustScoreLabel, getBarColorClass } from "@/lib/utils";

interface ResultCardProps {
  result: {
    scan: {
      trustScore: number;
      isAuthentic: boolean;
      logoScore: number;
      textureScore: number;
      barcodeScore: number;
      blockchainVerified: boolean;
      blockchainHash?: string;
    };
    analysis: {
      trustScore: number;
      isAuthentic: boolean;
      logoScore: number;
      textureScore: number;
      barcodeScore: number;
      confidenceLevel: number;
      detectionDetails: string[];
    };
  };
}

export function ResultCard({ result }: ResultCardProps) {
  const [activeTab, setActiveTab] = useState("scores");
  
  const { scan, analysis } = result;
  const trustScore = scan.trustScore || 0;
  const isAuthentic = scan.isAuthentic;
  
  return (
    <Card>
      <CardHeader className={isAuthentic ? "bg-green-50" : "bg-red-50"}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              {isAuthentic ? (
                <>
                  <ShieldCheck className="mr-2 h-6 w-6 text-green-500" />
                  <span className="text-green-700">Authentic Product</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="mr-2 h-6 w-6 text-red-500" />
                  <span className="text-red-700">Suspicious Product</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              AI-powered verification completed
            </CardDescription>
          </div>
          <Badge
            className={`text-lg px-3 py-1 ${isAuthentic ? "bg-green-500" : "bg-red-500"}`}
          >
            {trustScore}%
          </Badge>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 m-4">
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>
        
        <CardContent className="px-4 pt-0 pb-4">
          <TabsContent value="scores" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Trust Score</span>
                  <span className={`text-sm font-medium ${getTrustScoreColor(trustScore)}`}>
                    {getTrustScoreLabel(trustScore)}
                  </span>
                </div>
                <Progress value={trustScore} className={getBarColorClass(trustScore)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Logo Analysis</span>
                  <span className="text-sm font-medium">{analysis.logoScore}%</span>
                </div>
                <Progress value={analysis.logoScore} className={getBarColorClass(analysis.logoScore)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Texture Analysis</span>
                  <span className="text-sm font-medium">{analysis.textureScore}%</span>
                </div>
                <Progress value={analysis.textureScore} className={getBarColorClass(analysis.textureScore)} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Barcode/QR Verification</span>
                  <span className="text-sm font-medium">{analysis.barcodeScore}%</span>
                </div>
                <Progress value={analysis.barcodeScore} className={getBarColorClass(analysis.barcodeScore)} />
              </div>
            </div>
            
            <div className="border p-3 rounded-md bg-gray-50">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium">AI Confidence Level</p>
              </div>
              <p className="text-sm text-gray-600">
                Our AI model is {Math.round(analysis.confidenceLevel * 100)}% confident in this analysis result.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <div className="space-y-4">
              <div className="p-3 rounded-md border bg-gray-50">
                <h3 className="font-medium mb-2">Detection Details</h3>
                <ul className="space-y-2">
                  {analysis.detectionDetails.map((detail, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="mt-0.5 mr-2">
                        {detail.includes("Perfect") || detail.includes("High") || detail.includes("Good") ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : detail.includes("inconsistencies") || detail.includes("Suspicious") ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : detail.includes("differences") ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <Info className="h-4 w-4 text-gray-500" />
                        )}
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 rounded-md border bg-gray-50">
                <h3 className="font-medium mb-2">What This Means</h3>
                <p className="text-sm text-gray-600">
                  {isAuthentic 
                    ? "This product appears to be authentic based on our AI analysis of the visual features, patterns, and markings."
                    : "This product shows potential signs of counterfeiting. We recommend caution before purchasing."}
                </p>
              </div>
              
              {!isAuthentic && (
                <div className="p-3 rounded-md border bg-red-50">
                  <h3 className="font-medium text-red-700 mb-2">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    Warning
                  </h3>
                  <p className="text-sm text-red-600">
                    Counterfeit products may be unsafe, ineffective, or made with harmful materials. Consider reporting this to the brand owner.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="blockchain" className="mt-0">
            <div className="space-y-4">
              <div className={`p-3 rounded-md border ${scan.blockchainVerified ? "bg-green-50" : "bg-gray-50"}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {scan.blockchainVerified ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-green-700">Blockchain Verified</h3>
                    </>
                  ) : (
                    <>
                      <Info className="h-5 w-5 text-gray-500" />
                      <h3 className="font-medium text-gray-700">Not Blockchain Verified</h3>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {scan.blockchainVerified
                    ? "This product has been registered on our blockchain network, providing an immutable record of its authenticity."
                    : "This product was not found on our blockchain registry. This doesn't necessarily mean it's counterfeit, as not all manufacturers register their products."}
                </p>
              </div>
              
              {scan.blockchainHash && (
                <div className="p-3 rounded-md border bg-gray-50">
                  <h3 className="font-medium mb-2">Blockchain Hash</h3>
                  <div className="bg-white p-2 rounded border overflow-x-auto">
                    <code className="text-xs">{scan.blockchainHash}</code>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This unique hash identifies the product on the blockchain
                  </p>
                </div>
              )}
              
              <div className="p-3 rounded-md border bg-blue-50">
                <h3 className="font-medium text-blue-700 mb-2">
                  <Info className="h-4 w-4 inline mr-1" />
                  What is Blockchain Verification?
                </h3>
                <p className="text-sm text-blue-600">
                  Blockchain verification provides a tamper-proof record of product authenticity. Manufacturers register their products with a unique digital fingerprint that can be verified by consumers.
                </p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t px-4 py-3">
        <Button variant="outline" size="sm" className="gap-1">
          <ArrowDownToLine className="h-4 w-4" />
          Save Report
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
