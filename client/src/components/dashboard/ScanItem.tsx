import { useState } from "react";
import { type Scan } from "@shared/schema";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDate, getTrustScoreColor, getTrustScoreLabel, getBarColorClass } from "@/lib/utils";
import { ChevronDown, ChevronUp, ImageIcon, QrCode, Box, Info } from "lucide-react";

interface ScanItemProps {
  scan: Scan;
}

export function ScanItem({ scan }: ScanItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get the scan type icon
  const getScanTypeIcon = () => {
    switch (scan.scanType) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "qr":
        return <QrCode className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getScanTypeIcon()}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {scan.productName || "Unknown Product"}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(scan.scanDate)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {scan.blockchainVerified && (
              <Badge variant="outline" className="flex items-center gap-1 border-blue-500 text-blue-500">
                <Box className="h-3 w-3" />
                Blockchain Verified
              </Badge>
            )}
            <Badge
              className={`${scan.isAuthentic ? "bg-green-500" : "bg-red-500"}`}
            >
              {scan.isAuthentic ? "Authentic" : "Suspicious"}
            </Badge>
            <Badge variant="outline" className={getTrustScoreColor(scan.trustScore || 0)}>
              Trust: {scan.trustScore}%
            </Badge>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-3 px-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Logo Score</p>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">{scan.logoScore}%</span>
                </div>
                <Progress value={scan.logoScore} className={getBarColorClass(scan.logoScore || 0)} />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Texture Score</p>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">{scan.textureScore}%</span>
                </div>
                <Progress value={scan.textureScore} className={getBarColorClass(scan.textureScore || 0)} />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Barcode Score</p>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">{scan.barcodeScore}%</span>
                </div>
                <Progress value={scan.barcodeScore} className={getBarColorClass(scan.barcodeScore || 0)} />
              </div>
            </div>
            
            {scan.blockchainHash && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Blockchain Hash</p>
                <code className="text-xs bg-gray-100 p-1 rounded">{scan.blockchainHash}</code>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t px-4 py-3 flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              Re-scan
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
