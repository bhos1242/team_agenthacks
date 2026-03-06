"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.20.28.jpeg",
    alt: "Elders enjoying a meal",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22 (1).jpeg",
    alt: "Community gathering",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.09.30.jpeg",
    alt: "Medical care session",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.17.03.jpeg",
    alt: "Recreational activities",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22 (3).jpeg",
    alt: "Peaceful environment",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.20.28 (1).jpeg",
    alt: "Happy moments together",
    span: "md:col-span-2 md:row-span-1",
  },
];

export function GallerySection() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
          >
            Moments of <span className="text-primary italic">Joy & Care</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A glimpse into the life at Seva Samarpan, where every elder is treated with dignity and every student finds a path to success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
