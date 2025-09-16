"use client";
import sampleVideo from "@/videoassets/wed2.mp4"; // video path inside public/assets
import React from "react";

export default function VideoPlayer() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full max-w-3xl rounded-lg shadow-lg"
      >
        <source src={sampleVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
