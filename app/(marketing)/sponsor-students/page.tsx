"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2, GraduationCap } from "lucide-react";
import { StudentCard, StudentCardProps } from "../_components/student-card";

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentCardProps["student"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("ALL");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        }
      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === "ALL" || student.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <section className="relative py-8 md:py-16 bg-muted/20 border-b">
        <div className="max-w-8xl mx-auto px-4 relative text-center space-y-2">
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
            Sponsor <span className="text-primary italic">Students</span>
          </h1>
          <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium opacity-80">
            Empower underprivileged students with quality education. 
            Every contribution changes a life.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-5 relative z-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-card p-2 md:p-3 rounded-2xl shadow-xl border border-border/40 mb-6 md:mb-10">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search students..."
              className="pl-9 h-9 md:h-11 bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl text-xs md:text-sm font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[160px] h-9 md:h-11 bg-muted/20 border-none focus:ring-1 focus:ring-primary rounded-xl text-xs md:text-sm font-bold uppercase tracking-tight">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-2xl">
                <SelectItem value="ALL" className="text-xs font-bold uppercase">All</SelectItem>
                <SelectItem value="UNDERPRIVILEGED" className="text-xs font-bold uppercase">Underprivileged</SelectItem>
                <SelectItem value="TRIBAL" className="text-xs font-bold uppercase">Tribal</SelectItem>
                <SelectItem value="ORPHAN" className="text-xs font-bold uppercase">Orphan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 bg-muted/10 rounded-3xl border-2 border-dashed border-border/60">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold">No students found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Adjust your filters or try a different search term.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl h-10 px-6 font-semibold"
              onClick={() => {
                setSearchQuery("");
                setCategory("ALL");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
