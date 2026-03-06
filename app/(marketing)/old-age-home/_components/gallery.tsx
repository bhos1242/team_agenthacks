"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.21.jpeg", alt: "Daily activities at old age home" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22 (1).jpeg", alt: "Community bonding" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22 (2).jpeg", alt: "Care and support" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22 (3).jpeg", alt: "Peaceful living" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 09.49.22.jpeg", alt: "Elderly care" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.09.30.jpeg", alt: "Medical checkup" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.09.43.jpeg", alt: "Group activities" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.11.07.jpeg", alt: "Smiling faces" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.17.03.jpeg", alt: "Relaxation time" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.20.28 (1).jpeg", alt: "Meal time" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.20.28 (2).jpeg", alt: "Social interactions" },
  { src: "/olg-age-home-images/WhatsApp Image 2026-03-06 at 10.20.28.jpeg", alt: "Holistic care" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-12 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Life at <span className="text-primary italic">Seva Samarpan</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a look at the dignified life and caring community we've built for our elders.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden cursor-zoom-in group shadow-sm bg-background border"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50 p-2"
            >
              <X size={40} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-50 p-2 md:p-4 bg-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </motion.div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-50 p-2 md:p-4 bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
