"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, HomeIcon, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const programs = [
  {
    title: 'Free Library & Study Room',
    description: 'A dedicated library and study space for tribal and underprivileged students, equipped with over 1,500 books and modern learning resources.',
    icon: BookOpen,
    link: '/free-library-study-room',
    color: 'primary',
  },
  {
    title: 'Seva Samarpan Old Age Home',
    description: 'A sanctuary in Pune providing dignified living, holistic care, and a supportive community for our elders.',
    icon: HomeIcon,
    link: '/old-age-home',
    color: 'secondary',
  },
];

export function ProgramsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
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
    <section className="pt-4 pb-10 md:pt-8 md:pb-16 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
            Our Core <span className="text-primary italic">Programs</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground leading-relaxed px-4">
            Seva Samarpan is dedicated to transforming lives through education, 
            compassionate care, and sustainable community development.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel Wrapper */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {programs.map((program, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-1 first:pl-0">
                  <div className="px-2 h-full">
                    <ProgramCard program={program} />
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

        {/* Section-wide CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <Link href="/programs">
            <Button size="lg" variant="secondary" className="h-12 md:h-14 px-8 md:px-10 rounded-2xl text-sm md:text-base font-bold shadow-lg shadow-secondary/10 transition-all duration-300 group">
              Explore All Programs
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: typeof programs[0] }) {
  const badgeBg = program.color === 'primary' 
    ? 'bg-primary/10' 
    : program.color === 'secondary' 
      ? 'bg-secondary/10' 
      : 'bg-accent/10';
  const iconText = program.color === 'primary' 
    ? 'text-primary' 
    : program.color === 'secondary' 
      ? 'text-secondary' 
      : 'text-accent';
  const shadowClass = program.color === 'primary' 
    ? 'shadow-primary/20' 
    : program.color === 'secondary' 
      ? 'shadow-secondary/20' 
      : 'shadow-accent/20';

  return (
    <Link href={program.link} className="block group h-full">
      <div className="h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col rounded-[2rem] overflow-hidden group relative bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5">
        
        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full flex-1">
          <div className="p-6 md:p-8 pb-3 md:pb-4 flex flex-col">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${badgeBg} flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${shadowClass}`}>
              <program.icon className={`h-7 w-7 md:h-8 md:w-8 ${iconText}`} />
            </div>
            <h3 className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {program.title}
            </h3>
          </div>
          
          <div className="p-6 md:p-8 pt-0 flex-1 flex flex-col justify-between">
            <p className="text-xs md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-8 font-medium">
              {program.description}
            </p>
            <div className={`flex items-center text-xs md:text-base font-extrabold tracking-tight transition-all duration-300 group-hover:translate-x-2 ${iconText}`}>
              EXPLORE MORE <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 stroke-[3px]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

