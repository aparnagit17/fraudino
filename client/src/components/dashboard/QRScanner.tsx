import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, QrCode, Scan } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ResultCard } from "./ResultCard";

interface FormData {
  qrData: string;
}

export function QRScanner() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [scanResult, setScanResult] = useState<any | null>(null);
  
  const form = useForm<FormData>({
    defaultValues: {
      qrData: "",
    },
  });
  
  const scanMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/scan/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to process QR code");
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/scans"] });
      setScanResult({
        scan: data.scan,
        analysis: {
          trustScore: data.scan.trustScore,
          isAuthentic: data.scan.isAuthentic,
          logoScore: 0,
          textureScore: 0,
          barcodeScore: data.scan.trustScore,
          confidenceLevel: data.scan.trustScore / 100,
          detectionDetails: [
            `Product ${data.verified ? "verified" : "not found"} on blockchain`,
            `QR code analysis: ${data.scan.trustScore}%`,
            data.product ? `Product: ${data.product.name}` : "Unknown product"
          ]
        }
      });
      
      toast({
        title: "QR scan completed",
        description: data.verified 
          ? "Product verified on blockchain" 
          : "Product not found on blockchain",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "QR scan failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormData) => {
    scanMutation.mutate(data);
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
          <CardDescription>
            Scan a QR code for product verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="qrData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QR Code Data</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter QR code data" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <QrCode className="h-20 w-20 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 text-center mb-4">
                  Use your device's camera to scan a QR code for instant verification
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Scan className="mr-2 h-4 w-4" />
                  Open Camera Scanner
                  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </Button>
              </div>
              
              <Button
                type="submit"
                disabled={scanMutation.isPending}
                className="w-full"
              >
                {scanMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify QR Code"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div>
        {scanResult ? (
          <ResultCard result={scanResult} />
        ) : (
          <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
            <div className="p-3 rounded-full bg-gray-100 mb-4">
              <QrCode className="h-10 w-10 text-gray-400" />
            </div>
            <CardTitle className="mb-2">No QR Scan Results</CardTitle>
            <CardDescription>
              Scan a QR code to see verification results here
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
