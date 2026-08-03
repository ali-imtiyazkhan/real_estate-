"use client";

import { useState } from "react";

interface MapDownloadButtonProps {
  mapUrl: string;
  propertyTitle: string;
}

export default function MapDownloadButton({
  mapUrl,
  propertyTitle,
}: MapDownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(mapUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      const cleanTitle = propertyTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `${cleanTitle}-layout-map.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Map download failed, opening in new tab:", err);
      window.open(mapUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-base-900 bg-base-100 border border-base-300 rounded-md hover:bg-base-200 transition-colors disabled:opacity-50"
    >
      <svg
        className="w-4 h-4 text-base-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      {downloading ? "Downloading..." : "Download Layout Map"}
    </button>
  );
}
