"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Donation = {
  id: string;
  amount: number;
  name: string;
  email: string;
  phone: string | null;
  panNumber: string | null;
  needs80G: boolean;
  status: string;
  createdAt: string;
  paymentId: string | null;
  student: {
    fullName: string;
  } | null;
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations");
      if (!response.ok) throw new Error("Failed to fetch donations");
      const data = await response.json();
      setDonations(data);
    } catch {
      toast.error("Error loading donations data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDonations = donations.filter((d) => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.paymentId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donations</h1>
          <p className="text-muted-foreground">View all sponsorship contributions and donor details.</p>
        </div>
        {/* Placeholder for export functionality */}
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by donor name, email, or payment ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Student Sponsored</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>80G Req.</TableHead>
              <TableHead className="text-right">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>
                </TableCell>
              </TableRow>
            ) : filteredDonations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No donations found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredDonations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(d.createdAt), "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{d.name}</span>
                      <span className="text-xs text-muted-foreground">{d.email}</span>
                      {d.phone && <span className="text-xs text-muted-foreground">{d.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-sm">
                      {d.student ? d.student.fullName : "General Fund"}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    ₹{d.amount.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>
                    {d.status === "COMPLETED" ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                        Success
                      </span>
                    ) : d.status === "FAILED" ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
                        Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {d.needs80G ? (
                      <div className="flex flex-col">
                        <span className="inline-flex w-fit items-center rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-800">
                          YES
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">PAN: {d.panNumber || "N/A"}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-muted-foreground">
                    {d.paymentId || "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
