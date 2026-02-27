export function QuoteSection() {
  return (
    <section className="py-10 md:py-16 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <QuoteIcon className="absolute top-10 left-10 w-32 h-32 md:w-40 md:h-40" />
         <QuoteIcon className="absolute bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 rotate-180" />
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <blockquote className="text-2xl md:text-4xl font-medium leading-tight">
            &quot;Education is the most powerful weapon which you can use to change the world.&quot;
          </blockquote>
          <p className="text-lg md:text-xl opacity-80 font-semibold tracking-wider">— SAMARPAN TEAM</p>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
      <path d="M13 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
    </svg>
  );
}
