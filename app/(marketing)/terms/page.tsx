import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Seva Samarpan",
  description: "Read the terms and conditions for using the Seva Samarpan platform.",
};

export default function TermsAndConditions() {
  const lastUpdated = "February 24, 2026";

  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
            Terms & <span className="text-primary italic">Conditions</span>
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              By accessing or using the Seva Samarpan website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in India. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Use License
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Permission is granted to temporarily download one copy of the materials (information or software) on Seva Samarpan&apos;s website for personal, non-commercial transitory viewing only. You may not modify, copy, or use the materials for any commercial purpose.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">03</span>
              Donations
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              All donations made through our platform are voluntary and are used for the stated charitable purposes. Seva Samarpan is a registered NGO in India. Tax exemption certificates (e.g., 80G) will be issued as per the prevailing Income Tax rules in India.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">04</span>
              Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">05</span>
              Modification of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Seva Samarpan may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
