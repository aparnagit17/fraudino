import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Database, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  hash: string;
}

export function BlockchainVerifier() {
  const { toast } = useToast();
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  
  const form = useForm<FormData>({
    defaultValues: {
      hash: "",
    },
  });
  
  const verifyMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/verify/blockchain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to verify blockchain hash");
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      setVerificationResult(data);
      
      toast({
        title: data.verified ? "Verification successful" : "Verification failed",
        description: data.verified 
          ? "Product verified on blockchain" 
          : "Product not found on blockchain",
        variant: data.verified ? "default" : "destructive",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormData) => {
    verifyMutation.mutate(data);
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
          <CardDescription>
            Enter a blockchain hash to verify product authenticity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="hash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain Hash</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blockchain hash" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full"
              >
                {verifyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify on Blockchain"
                )}
              </Button>
            </form>
          </Form>
          
          {verificationResult && (
            <div className="mt-6 p-4 border rounded-lg">
              <div className="flex items-center mb-4">
                {verificationResult.verified ? (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-green-500 mr-2" />
                    <div>
                      <h3 className="font-medium text-green-500">Verified on Blockchain</h3>
                      <p className="text-sm text-gray-500">Product authenticity confirmed</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-8 w-8 text-red-500 mr-2" />
                    <div>
                      <h3 className="font-medium text-red-500">Not Verified</h3>
                      <p className="text-sm text-gray-500">Product not found on blockchain</p>
                    </div>
                  </>
                )}
              </div>
              
              {verificationResult.product && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Product Details</h4>
                  <dl className="space-y-1">
                    <div className="flex">
                      <dt className="w-1/3 text-gray-500">Name:</dt>
                      <dd>{verificationResult.product.name}</dd>
                    </div>
                    {verificationResult.product.description && (
                      <div className="flex">
                        <dt className="w-1/3 text-gray-500">Description:</dt>
                        <dd>{verificationResult.product.description}</dd>
                      </div>
                    )}
                    <div className="flex">
                      <dt className="w-1/3 text-gray-500">Registered:</dt>
                      <dd>{new Date(verificationResult.product.registrationDate).toLocaleDateString()}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <div className="flex items-center text-sm text-gray-500">
            <Database className="h-4 w-4 mr-1" />
            <span>Powered by secure blockchain verification</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
