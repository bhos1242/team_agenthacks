import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Seva Samarpan",
  description: "Our policy regarding refund and cancellation of donations.",
};

export default function RefundPolicy() {
  const lastUpdated = "February 24, 2026";

  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase leading-tight">
            Refund & <span className="text-primary italic">Cancellation</span>
          </h1>
          <p className="text-muted-foreground font-medium">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Donation Refund Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Seva Samarpan follows a reliable refund policy to let our donors feel privileged about their association with us. We take the utmost care about processing donations as per the mandates signed by our donors in the offline as well as online mode.
            </p>
            <p className="text-muted-foreground leading-relaxed font-medium mt-4">
              In case of an unlikely event of an erroneous donation or if the donor would like to cancel their donation, Seva Samarpan will respond to the donor within 7 working days of receiving a valid request from the donor.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Timeline for Refund
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              The timely refund of the donated amount depends upon the type of card used during the transaction. It may take up to 10-15 working days for the refund to reflect in the donor&apos;s account.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">03</span>
              Cancellation Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Once a donation is processed and the tax-exempt certificate (80G) has been issued, the donation cannot be cancelled or refunded as the data has been submitted to the Income Tax Department.
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">04</span>
              How to Request a Refund
            </h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              To request a refund, please send an email to <strong className="text-foreground">sevasamarpanngo@gmail.com</strong> with the transaction details (Date, Amount, Transaction ID) and the reason for the refund request.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
