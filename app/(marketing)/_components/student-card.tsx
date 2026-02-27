"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentCardProps {
  student: {
    id: string;
    fullName: string;
    photoUrl: string;
    age?: number;
    standard: string;
    schoolOrCollege: string;
    location: string;
    category: string;
    requiredAmount: number;
    collectedAmount: number;
  };
  className?: string;
}

export function StudentCard({ student, className }: StudentCardProps) {
  const percentage = Math.round(
    (student.collectedAmount / student.requiredAmount) * 100,
  );
  const remaining = student.requiredAmount - student.collectedAmount;

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-border/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/sponsor-students/${student.id}`} className="block w-full h-full">
          <Image
            src={student.photoUrl}
            alt={student.fullName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        </Link>
        
        {/* Badges - Top left */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1.5">
          <Badge className="bg-white/95 hover:bg-white text-zinc-950 border-none backdrop-blur-md font-black text-[7px] md:text-[10px] uppercase tracking-widest px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg shadow-xl">
            {student.category}
          </Badge>
        </div>

        {/* Location - Bottom left */}
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center gap-1 text-white/95">
          <div className="bg-primary p-0.5 md:p-1 rounded-sm md:rounded-md shadow-lg">
            <MapPin className="h-2 w-2 md:h-3 md:w-3 text-white" />
          </div>
          <span className="text-[9px] md:text-xs font-black truncate drop-shadow-md tracking-tight">
            {student.location}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-2.5 md:p-5 space-y-2 md:space-y-4">
        {/* Name and Basic Info */}
        <div className="space-y-0.5 md:space-y-1">
          <Link href={`/sponsor-students/${student.id}`} className="group/title inline-block max-w-full">
            <h3 className="text-xs md:text-xl font-black leading-tight tracking-tighter text-foreground group-hover/title:text-primary transition-colors line-clamp-1">
              {student.fullName}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-muted-foreground/70">
            <GraduationCap className="h-2.5 w-2.5 md:h-4 md:w-4 text-primary/60" />
            <p className="text-[9px] md:text-sm font-bold truncate tracking-tight">
              {student.standard}
            </p>
          </div>
        </div>

        {/* Funding Widget */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-2 md:p-4 rounded-xl md:rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-1.5 md:space-y-3">
          <div className="flex justify-between items-end">
            <div className="space-y-0">
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Support</span>
              <p className="text-[10px] md:text-lg font-black text-primary leading-none">
                {formatINR(student.collectedAmount)}
              </p>
            </div>
          </div>
          
          <div className="relative md:pt-1">
            <div className="h-1 md:h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-white dark:border-zinc-700 shadow-inner">
               <div 
                 className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                 style={{ width: `${percentage}%` }}
               />
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] md:text-[10px] font-black uppercase tracking-tighter">
            <span className="text-muted-foreground/70">{percentage}% Reached</span>
            <span className="text-primary/70">{formatINR(remaining)} to go</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Button
            variant="secondary"
            className="w-full h-8 md:h-14 font-black uppercase tracking-tighter text-[9px] md:text-sm rounded-lg md:rounded-2xl shadow-lg shadow-secondary/10 hover:shadow-secondary/20 transition-all hover:scale-[1.03] active:scale-95"
            asChild
          >
            <Link href={`/sponsor-students/${student.id}`}>
              Sponsor Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
