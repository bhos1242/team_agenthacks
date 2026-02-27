import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-10 md:py-16 bg-secondary/5 dark:bg-secondary/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center border-none shadow-xl shadow-secondary/10 relative overflow-hidden group bg-white dark:bg-zinc-950 rounded-[2rem]">
          <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent -z-10 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
            Ready to Make a <span className="text-primary italic">Difference?</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
            Your support can change lives. Whether through student sponsorship or donations to our programs, every contribution counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-xl h-12 md:h-14 px-8 font-extrabold shadow-lg shadow-secondary/10 transition-all group" asChild>
              <Link href="/sponsor-students">Donate Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl h-12 md:h-14 px-8 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-extrabold transition-all" asChild>
              <Link href="/about">Our Mission</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
