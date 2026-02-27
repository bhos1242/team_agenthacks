"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";

type Student = {
  id: string;
  fullName: string;
  category: string;
  requiredAmount: number;
  collectedAmount: number;
  progressPercentage: number;
  donorCount: number;
  isActive: boolean;
  createdAt: string;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch {
      toast.error("Error loading students");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const response = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch {
      toast.error("Failed to delete student");
    }
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage students needing sponsorship.</p>
        </div>
        <Link href="/dashboard/students/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.fullName}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {student.category}
                    </span>
                  </TableCell>
                  <TableCell>₹{student.requiredAmount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>₹{student.collectedAmount.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-muted-foreground">{student.progressPercentage}% funded</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.isActive ? (
                      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                    ) : (
                      <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">Inactive</span>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(student.createdAt), "dd MMM, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/students/${student.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
