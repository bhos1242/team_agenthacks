"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/AppInputFields/InputField";

const studentSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(3, "Age is required"),
  standard: z.string().min(1, "Standard/Class is required"),
  schoolOrCollege: z.string().min(2, "School/College name is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(2, "Category is required (e.g., Tribal, Underprivileged)"),
  story: z.string().min(10, "Story must be at least 10 characters"),
  achievements: z.string().optional(),
  requiredAmount: z.coerce.number().min(100, "Required amount must be at least 100"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function NewStudentPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      age: 0,
      standard: "",
      schoolOrCollege: "",
      location: "",
      category: "",
      story: "",
      achievements: "",
      requiredAmount: 0,
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    if (!photo) {
      toast.error("Please select a student photo");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value.toString());
      });
      formData.append("photo", photo);

      const res = await fetch("/api/students", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create student");
      }

      toast.success("Student added successfully");
      router.push("/dashboard/students");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Student</h1>
          <p className="text-muted-foreground">Fill in the details to list a new student for sponsorship.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Custom File Upload for Photo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Student Photo *</label>
              <div className="border border-input rounded-md p-3 flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField name="fullName" label="Full Name *" type="text" placeholder="John Doe" />
              <InputField name="age" label="Age *" type="number" placeholder="12" />
              
              <InputField name="standard" label="Standard/Class *" type="text" placeholder="7th Grade" />
              <InputField name="schoolOrCollege" label="School/College *" type="text" placeholder="Z.P. Primary School" />
              
              <InputField name="location" label="Location *" type="text" placeholder="District, State" />
              <InputField name="category" label="Category *" type="text" placeholder="Orphan, Tribal, etc." />
              
              <div className="md:col-span-2">
                <InputField name="requiredAmount" label="Fundraising Goal (₹) *" type="number" placeholder="5000" />
              </div>

              <div className="md:col-span-2">
                <InputField 
                  name="story" 
                  label="Student's Story *" 
                  type="ai-text-area" 
                  placeholder="Write about their background, struggles, and aspirations..." 
                  generationPrompt="Write a compelling, respectful, and hopeful 3-paragraph story about a student needing sponsorship. Focus on their background, struggles, and aspirations for education. Keep it authentic and suitable for an NGO donation platform."
                  maxLength={1500}
                />
              </div>

              <div className="md:col-span-2">
                <InputField 
                  name="achievements" 
                  label="Achievements (Optional)" 
                  type="ai-text-area" 
                  placeholder="Any academic or extracurricular achievements..." 
                  generationPrompt="Write a short list or brief paragraph highlighting academic or personal achievements that demonstrate the student's potential and dedication."
                  maxLength={500}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
              <Link href="/dashboard/students">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Student
              </Button>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
