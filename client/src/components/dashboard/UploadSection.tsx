import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ResultCard } from "./ResultCard";

interface FormData {
  productName: string;
  image: FileList;
}

export function UploadSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  
  const form = useForm<FormData>({
    defaultValues: {
      productName: "",
    },
  });
  
  const uploadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("image", data.image[0]);
      
      const res = await fetch("/api/scan/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload image");
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/scans"] });
      setScanResult(data);
      toast({
        title: "Scan completed",
        description: `Product scanned with Trust Score: ${data.scan.trustScore}%`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Scan failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", e.target.files as FileList);
    }
  };
  
  const onSubmit = (data: FormData) => {
    if (!data.image?.[0]) {
      toast({
        title: "No image selected",
        description: "Please select an image to scan",
        variant: "destructive",
      });
      return;
    }
    
    uploadMutation.mutate(data);
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Product Image</CardTitle>
          <CardDescription>
            Upload a clear image of your product for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex flex-col items-center">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="mb-3 h-32 object-contain"
                        />
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-600"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </FormItem>
              
              <Button
                type="submit"
                disabled={uploadMutation.isPending}
                className="w-full"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  "Scan Product"
                )}
              </Button>
            </form>
          </Form>
          
          {uploadMutation.isError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {uploadMutation.error.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <div>
        {scanResult ? (
          <ResultCard result={scanResult} />
        ) : (
          <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
            <div className="p-3 rounded-full bg-gray-100 mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <CardTitle className="mb-2">No Scan Results</CardTitle>
            <CardDescription>
              Upload a product image to see AI analysis results here
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
