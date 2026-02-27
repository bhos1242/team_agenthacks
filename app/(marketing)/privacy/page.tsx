import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Seva Samarpan",
  description: "Learn how Seva Samarpan collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "February 24, 2026";

  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
            Privacy <span className="text-primary italic">Policy</span>
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Seva Samarpan, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none font-medium">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">We collect information that you provide to us directly, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Personal identifiers (Name, Email address, Phone number, Postal address)</li>
              <li>Donation information (Transaction details, though we do not store full credit card numbers)</li>
              <li>Communication preferences and feedback</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">03</span>
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">The information we collect is used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
              <li>Process your donations and issue tax-exempt receipts</li>
              <li>Communicate updates about our programs and impact</li>
              <li>Improve our website performance and user experience</li>
              <li>Comply with legal and regulatory requirements in India</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-100 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">04</span>
              Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We implement industry-standard security measures to protect your data. All financial transactions are processed through secure payment gateways (like Razorpay) and are encrypted using SSL technology.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-100 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">05</span>
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong className="text-foreground">Email:</strong> contact@samarpan.org
              <br />
              <strong className="text-foreground">Phone:</strong> +91 94222 62499
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
