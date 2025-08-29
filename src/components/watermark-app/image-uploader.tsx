'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';

interface ImageUploaderProps {
  onImageUpload: (image: HTMLImageElement) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [onImageUpload]
  );

  const handleFile = (file: File) => {
    setError(null);
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, WebP)');

      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');

      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageUpload(img);
      };
      img.onerror = () => {
        setError('Failed to load image');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Upload Image</h3>
      
      <div
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-8 text-center transition-all',
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300',
          'hover:border-primary/50 hover:bg-primary/5'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="size-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-gray-700">Drag & drop your image here</p>
            <p className="mt-1 text-sm text-gray-500">or</p>
          </div>
          <Button 
            type="button" 
            onClick={handleClick}
            className="rounded-full bg-primary hover:bg-primary/90"
          >
            <ImageIcon className="mr-2 size-4" />
            Select Image
          </Button>
          <p className="text-xs text-gray-500">Supports JPG, PNG, WebP (Max 10MB)</p>
        </div>
      </div>
      
      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}