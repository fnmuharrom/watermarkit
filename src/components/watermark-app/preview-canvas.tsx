'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface PreviewCanvasProps {
  image: HTMLImageElement | null;
  watermarkText: string;
  fontSize: number;
  opacity: number;
  color: string;
  orientation: 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr';
  loopWatermark: boolean;
}

const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ image, watermarkText, fontSize, opacity, color, orientation, loopWatermark }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !image) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(image, 0, 0);

      if (watermarkText) {
        // Set watermark properties
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        if (loopWatermark) {
          // Loop watermark across the entire image
          drawLoopedWatermark(ctx, canvas, watermarkText, fontSize, orientation);
        } else {
          // Draw single watermark in the center
          drawSingleWatermark(ctx, canvas, watermarkText, fontSize, orientation);
        }
      }
    }, [image, watermarkText, fontSize, opacity, color, orientation, loopWatermark]);

    const drawSingleWatermark = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      text: string,
      fontSize: number,
      orientation: 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr'
    ) => {
      // Measure text
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      // Calculate position (center of canvas)
      let x, y;

      switch (orientation) {
        case 'horizontal': {
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2 + textHeight / 2;
          ctx.fillText(text, x, y);
          break;
        }
        case 'vertical': {
          x = canvas.width / 2;
          y = canvas.height / 2;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(text, -textWidth / 2, textHeight / 2);
          ctx.restore();
          break;
        }
        case 'diagonal-tl-br': { // Top-left to bottom-right
          x = canvas.width / 2;
          y = canvas.height / 2;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 4);
          ctx.fillText(text, -textWidth / 2, textHeight / 2);
          ctx.restore();
          break;
        }
        case 'diagonal-bl-tr': { // Bottom-left to top-right
          x = canvas.width / 2;
          y = canvas.height / 2;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 4);
          ctx.fillText(text, -textWidth / 2, textHeight / 2);
          ctx.restore();
          break;
        }
      }
    };

    const drawLoopedWatermark = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      text: string,
      fontSize: number,
      orientation: 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr'
    ) => {
      // Measure text
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      // Set spacing between watermarks
      const horizontalSpacing = textWidth * 1.5;
      const verticalSpacing = textHeight * 3;

      switch (orientation) {
        case 'horizontal': {
          // Loop horizontally across the image
          for (let y = verticalSpacing; y < canvas.height; y += verticalSpacing) {
            for (let x = horizontalSpacing; x < canvas.width + textWidth; x += horizontalSpacing) {
              ctx.fillText(text, x - textWidth / 2, y);
            }
          }
          break;
        }
        case 'vertical': {
          // Loop vertically down the image
          for (let x = horizontalSpacing; x < canvas.width; x += horizontalSpacing) {
            for (let y = verticalSpacing; y < canvas.height + textHeight; y += verticalSpacing) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(-Math.PI / 2);
              ctx.fillText(text, -textWidth / 2, textHeight / 2);
              ctx.restore();
            }
          }
          break;
        }
        case 'diagonal-tl-br': { // Top-left to bottom-right
          // Create a grid pattern with diagonal watermarks
          const diagonalSpacing = (textWidth + textHeight) * 1.2;
          for (let y = -canvas.height; y < canvas.height * 2; y += diagonalSpacing) {
            for (let x = -canvas.width; x < canvas.width * 2; x += diagonalSpacing) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(Math.PI / 4);
              ctx.fillText(text, -textWidth / 2, textHeight / 2);
              ctx.restore();
            }
          }
          break;
        }
        case 'diagonal-bl-tr': { // Bottom-left to top-right
          // Create a grid pattern with diagonal watermarks
          const diagonalSpacing2 = (textWidth + textHeight) * 1.2;
          for (let y = -canvas.height; y < canvas.height * 2; y += diagonalSpacing2) {
            for (let x = -canvas.width; x < canvas.width * 2; x += diagonalSpacing2) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(-Math.PI / 4);
              ctx.fillText(text, -textWidth / 2, textHeight / 2);
              ctx.restore();
            }
          }
          break;
        }
      }
    };

    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
        <canvas
          ref={canvasRef}
          className="max-h-[70vh] w-full object-contain"
        />
        {!image && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            <p>Upload an image to see preview</p>
          </div>
        )}
      </div>
    );
  }
);

PreviewCanvas.displayName = 'PreviewCanvas';

export default PreviewCanvas;