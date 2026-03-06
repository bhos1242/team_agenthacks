"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Where is Seva Samarpan located?",
    answer: "Seva Samarpan is located in Pune, Maharashtra. We operate primarily in the tribal blocks of Pune, providing education support and care for the elderly."
  },
  {
    question: "How can I support Seva Samarpan?",
    answer: "You can support us through general donations or by volunteering. Your contributions directly help sustain our library and old age home facilities."
  },
  {
    question: "Is Seva Samarpan a registered NGO?",
    answer: "Yes, Seva Samarpan is a registered non-governmental organization dedicated to social impact through education and welfare programs in rural Pune."
  },
  {
    question: "How are donations utilized?",
    answer: "Your donations go directly towards maintaining our old age home, sustaining the free library for students, and providing essential educational materials and care services."
  },
  {
    question: "Can I visit the Old Age Home or Library?",
    answer: "Yes, we welcome visitors! Please contact us through our official channels to schedule a visit to our Pune facilities."
  }
];

export function FAQSection() {
  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Common <span className="text-primary italic">Questions</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            Everything you need to know about our mission and how you can help.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-black/5 dark:border-white/5 bg-white/50 dark:bg-zinc-950/50 rounded-2xl px-6 md:px-8 transition-all hover:bg-white dark:hover:bg-zinc-950 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-6 pt-0">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* JSON-LD for FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
