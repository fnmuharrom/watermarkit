'use client';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadButton({ canvasRef }: DownloadButtonProps) {
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) return;

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'watermarked-image.png';
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <Button 
      onClick={handleDownload}
      disabled={!canvasRef.current}
      className="rounded-full bg-primary hover:bg-primary/90 px-6 py-3"
    >
      <Download className="mr-2 size-4" />
      Download Watermarked Image
    </Button>
  );
}