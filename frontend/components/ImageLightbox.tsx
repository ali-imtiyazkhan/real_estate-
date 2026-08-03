"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  title: string;
}

export default function ImageLightbox({ images, title }: ImageLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Thumbnail Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            onClick={() => setSelectedIndex(index)}
            className="group relative overflow-hidden cursor-pointer rounded-lg border border-base-200"
          >
            <Image
              src={src}
              alt={`${title} photo ${index + 1}`}
              width={500}
              height={375}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-[4/3] object-cover w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium px-3 py-1.5 bg-black/60 rounded-full backdrop-blur-sm">
                🔍 View Fullscreen
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-base-300 text-sm font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-md"
            >
              ✕ Close (Esc)
            </button>

            {/* Main Image */}
            <div className="relative w-full h-[75vh]">
              <Image
                src={images[selectedIndex]!}
                alt={`${title} enlarged photo`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Navigation Controls */}
            {images.length > 1 && (
              <div className="flex items-center justify-between w-full mt-4 px-4 text-white">
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : 0
                    )
                  }
                  className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 text-sm font-medium backdrop-blur-md"
                >
                  ← Previous
                </button>

                <span className="text-xs text-base-300 font-medium">
                  {selectedIndex + 1} / {images.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : 0
                    )
                  }
                  className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 text-sm font-medium backdrop-blur-md"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
