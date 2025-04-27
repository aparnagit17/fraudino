import { useState } from "react";
import { type Scan } from "@shared/schema";
import { ScanItem } from "./ScanItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Search } from "lucide-react";

interface ScanHistoryProps {
  scans: Scan[];
}

export function ScanHistory({ scans }: ScanHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");

  const filteredScans = scans
    .filter((scan) => {
      // First apply the search filter
      const matchesSearch =
        searchTerm === "" ||
        (scan.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scan.scanType.toLowerCase().includes(searchTerm.toLowerCase()));

      // Then apply the verification filter
      if (filterBy === "all") return matchesSearch;
      if (filterBy === "authentic") return matchesSearch && scan.isAuthentic === true;
      if (filterBy === "counterfeit") return matchesSearch && scan.isAuthentic === false;
      if (filterBy === "blockchain") return matchesSearch && scan.blockchainVerified === true;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.scanDate).getTime() - new Date(a.scanDate).getTime();
      } else if (sortBy === "score") {
        return (b.trustScore || 0) - (a.trustScore || 0);
      } else if (sortBy === "name") {
        return (a.productName || "").localeCompare(b.productName || "");
      }
      return 0;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Scan History
        </CardTitle>
        <CardDescription>View and manage your previous product scans</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search scans..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scans</SelectItem>
                <SelectItem value="authentic">Authentic</SelectItem>
                <SelectItem value="counterfeit">Counterfeit</SelectItem>
                <SelectItem value="blockchain">Blockchain Verified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (Newest)</SelectItem>
                <SelectItem value="score">Trust Score</SelectItem>
                <SelectItem value="name">Product Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredScans.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-500">No scan history found</h3>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm || filterBy !== "all"
                ? "Try adjusting your search or filters"
                : "Start scanning products to build your history"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredScans.map((scan) => (
              <ScanItem key={scan.id} scan={scan} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
