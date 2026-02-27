import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Seva Samarpan",
  description: "Our policy regarding the delivery of services and donor receipts.",
};

export default function ShippingPolicy() {
  const lastUpdated = "February 24, 2026";

  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase leading-tight">
            Shipping & <span className="text-primary italic">Delivery</span>
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Service Delivery
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Seva Samarpan is a non-profit organization providing social services including education and elderly care. We do not sell or ship physical products. Our services are provided directly at our facilities in Pune.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Digital Receipts
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              For all online donations made through our website, an automated digital receipt is sent to the donor&apos;s registered email address immediately upon successful transaction completion.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">03</span>
              Timeline for Certificates
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              The 80G tax-exemption certificate will be issued and emailed to the donor within 15-30 working days from the date of the successful donation, provided all necessary KYC details (like PAN) are provided by the donor.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">04</span>
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              If you have not received your digital receipt or have any queries regarding the delivery of your 80G certificate, please reach out to us at <strong className="text-foreground">contact@samarpan.org</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
