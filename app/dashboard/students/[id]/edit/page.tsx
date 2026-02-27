"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/AppInputFields/InputField";

const studentSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(3, "Age is required"),
  standard: z.string().min(1, "Standard/Class is required"),
  schoolOrCollege: z.string().min(2, "School/College name is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(2, "Category is required"),
  story: z.string().min(10, "Story must be at least 10 characters"),
  achievements: z.string().optional().nullable(),
  requiredAmount: z.coerce.number().min(100, "Required amount must be at least 100"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) throw new Error("Failed to load student");
        const data = await res.json();
        
        // Populate form
        methods.reset({
          fullName: data.fullName,
          age: data.age,
          standard: data.standard,
          schoolOrCollege: data.schoolOrCollege,
          location: data.location,
          category: data.category,
          story: data.story,
          achievements: data.achievements,
          requiredAmount: data.requiredAmount,
        });
        setCurrentPhotoUrl(data.photoUrl);
      } catch {
        toast.error("Failed to load student data");
        router.push("/dashboard/students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [id, methods, router]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value.toString());
      });
      
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update student");
      }

      toast.success("Student updated successfully");
      router.push("/dashboard/students");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
          <p className="text-muted-foreground">Update the details for this sponsored student.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Custom File Upload for Photo with preview of existing */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Update Photo (Optional)</label>
              <div className="border border-input rounded-md p-4 flex flex-col sm:flex-row items-center gap-4">
                {currentPhotoUrl && !photo && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border shrink-0">
                    <Image src={currentPhotoUrl} alt="Current" fill className="object-cover" />
                  </div>
                )}
                {photo && (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex flex-col items-center justify-center shrink-0 border">
                    <ImageIcon className="h-6 w-6 text-primary" />
                    <span className="text-[10px] font-medium text-primary mt-1">NEW</span>
                  </div>
                )}
                <div className="flex-1 w-full relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    className="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Leave empty to keep the current photo.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField name="fullName" label="Full Name *" type="text" />
              <InputField name="age" label="Age *" type="number" />
              
              <InputField name="standard" label="Standard/Class *" type="text" />
              <InputField name="schoolOrCollege" label="School/College *" type="text" />
              
              <InputField name="location" label="Location *" type="text" />
              <InputField name="category" label="Category *" type="text" />
              
              <div className="md:col-span-2">
                <InputField name="requiredAmount" label="Fundraising Goal (₹) *" type="number" />
              </div>

              <div className="md:col-span-2">
                <InputField 
                  name="story" 
                  label="Student's Story *" 
                  type="ai-text-area" 
                  generationPrompt="Write a compelling, respectful, and hopeful 3-paragraph story about a student needing sponsorship. Focus on their background, struggles, and aspirations for education. Keep it authentic and suitable for an NGO donation platform."
                  maxLength={1500}
                />
              </div>

              <div className="md:col-span-2">
                <InputField 
                  name="achievements" 
                  label="Achievements (Optional)" 
                  type="ai-text-area" 
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
                Update Student
              </Button>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
