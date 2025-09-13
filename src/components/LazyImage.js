"use client";

import Image from "next/image";
import { useState } from "react";

export default function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}
    </div>
  );
}
