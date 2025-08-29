'use client';

import { useState, useRef } from 'react';
import ImageUploader from './image-uploader';
import WatermarkControls from './watermark-controls';
import PreviewCanvas from './preview-canvas';
import DownloadButton from './download-button';

export default function WatermarkApp() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [watermarkText, setWatermarkText] = useState('WATERMARK');
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState('#FF6B6B');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr'>('horizontal');
  const [loopWatermark, setLoopWatermark] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Predefined pastel colors
  const colorOptions = [
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquoise
    '#FFD166', // Yellow
    '#6A0572', // Purple
    '#1A535C', // Teal
    '#FF9AA2', // Pink
    '#FFB7B2', // Light Pink
    '#FFDAC1', // Peach
    '#E2F0CB', // Light Green
    '#B5EAD7', // Mint
  ];

  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Controls */}
        <div className="lg:col-span-1">
          <div className="space-y-6 rounded-2xl bg-gray-50 p-6">
            <ImageUploader onImageUpload={setImage} />
            <WatermarkControls
              watermarkText={watermarkText}
              setWatermarkText={setWatermarkText}
              fontSize={fontSize}
              setFontSize={setFontSize}
              opacity={opacity}
              setOpacity={setOpacity}
              color={color}
              setColor={setColor}
              orientation={orientation}
              setOrientation={setOrientation}
              loopWatermark={loopWatermark}
              setLoopWatermark={setLoopWatermark}
              colorOptions={colorOptions}
            />
          </div>
        </div>

        {/* Right Column - Preview and Download */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Preview</h2>
            <div className="flex flex-col items-center">
              <PreviewCanvas
                ref={canvasRef}
                image={image}
                watermarkText={watermarkText}
                fontSize={fontSize}
                opacity={opacity}
                color={color}
                orientation={orientation}
                loopWatermark={loopWatermark}
              />
              <div className="mt-6">
                <DownloadButton canvasRef={canvasRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}