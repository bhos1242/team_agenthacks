"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StudentCard, type StudentCardProps } from "./student-card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const featuredStudents: StudentCardProps['student'][] = [
  {
    id: '1',
    fullName: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop',
    age: 16,
    standard: '11th',
    schoolOrCollege: 'Pune High School',
    location: 'Pune',
    category: 'TRIBAL',
    requiredAmount: 25000,
    collectedAmount: 12000,
  },
  {
    id: '2',
    fullName: 'Rahul Patil',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    age: 19,
    standard: 'B.Com 2nd Year',
    schoolOrCollege: 'Pune College',
    location: 'Pune',
    category: 'UNDERPRIVILEGED',
    requiredAmount: 40000,
    collectedAmount: 28000,
  },
  {
    id: '3',
    fullName: 'Anita Desai',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    age: 14,
    standard: '9th',
    schoolOrCollege: 'Government School',
    location: 'Pune',
    category: 'TRIBAL',
    requiredAmount: 18000,
    collectedAmount: 5000,
  },
];

export function FeaturedStudents() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <section className="py-10 md:py-16 bg-muted/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
            Support Our <span className="text-primary italic">Students</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground leading-relaxed px-4">
            Every contribution makes a direct difference in a student&apos;s educational journey.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {featuredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {featuredStudents.map((student) => (
                <div key={student.id} className="flex-[0_0_100%] min-w-0 pl-1 first:pl-0">
                  <div className="px-2">
                    <StudentCard student={student} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicators (Dots) */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_: number, index: number) => (
              <button
                key={index}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" variant="secondary" className="rounded-xl px-8 h-12 md:h-14 font-extrabold shadow-lg shadow-secondary/10 transition-all group" asChild>
            <Link href="/sponsor-students">
              View All Students <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
