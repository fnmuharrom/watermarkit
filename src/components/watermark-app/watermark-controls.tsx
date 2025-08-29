'use client';

import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Slider } from '@/registry/new-york-v4/ui/slider';
import { Switch } from '@/registry/new-york-v4/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york-v4/ui/toggle-group';
import { 
  AlignCenterHorizontal, 
  AlignCenterVertical,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';

interface WatermarkControlsProps {
  watermarkText: string;
  setWatermarkText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  color: string;
  setColor: (color: string) => void;
  orientation: 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr';
  setOrientation: (orientation: 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr') => void;
  loopWatermark: boolean;
  setLoopWatermark: (loop: boolean) => void;
  colorOptions: string[];
}

export default function WatermarkControls({
  watermarkText,
  setWatermarkText,
  fontSize,
  setFontSize,
  opacity,
  setOpacity,
  color,
  setColor,
  orientation,
  setOrientation,
  loopWatermark,
  setLoopWatermark,
  colorOptions,
}: WatermarkControlsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800">Watermark Settings</h3>
      
      {/* Watermark Text */}
      <div className="space-y-2">
        <Label htmlFor="watermark-text" className="text-gray-700">
          Watermark Text
        </Label>
        <Input
          id="watermark-text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Enter watermark text"
          className="rounded-full"
        />
      </div>
      
      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="font-size" className="text-gray-700">
            Font Size
          </Label>
          <span className="text-sm text-gray-500">{fontSize}px</span>
        </div>
        <Slider
          id="font-size"
          min={12}
          max={72}
          step={1}
          value={[fontSize]}
          onValueChange={([value]) => setFontSize(value)}
          className="rounded-full"
        />
      </div>
      
      {/* Opacity */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="opacity" className="text-gray-700">
            Opacity
          </Label>
          <span className="text-sm text-gray-500">{Math.round(opacity * 100)}%</span>
        </div>
        <Slider
          id="opacity"
          min={0}
          max={1}
          step={0.01}
          value={[opacity]}
          onValueChange={([value]) => setOpacity(value)}
          className="rounded-full"
        />
      </div>
      
      {/* Loop Watermark */}
      <div className="flex items-center justify-between">
        <Label htmlFor="loop-watermark" className="text-gray-700">
          Loop Watermark
        </Label>
        <Switch
          id="loop-watermark"
          checked={loopWatermark}
          onCheckedChange={setLoopWatermark}
        />
      </div>
      
      {/* Orientation */}
      <div className="space-y-2">
        <Label className="text-gray-700">Orientation</Label>
        <ToggleGroup
          type="single"
          value={orientation}
          onValueChange={(value) => value && setOrientation(value as 'horizontal' | 'vertical' | 'diagonal-tl-br' | 'diagonal-bl-tr')}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem
            value="horizontal"
            aria-label="Horizontal orientation"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <AlignCenterHorizontal className="size-4" />
            <span className="ml-2">Horizontal</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="vertical"
            aria-label="Vertical orientation"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <AlignCenterVertical className="size-4" />
            <span className="ml-2">Vertical</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="diagonal-tl-br"
            aria-label="Diagonal top-left to bottom-right"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <ArrowDownRight className="size-4" />
            <span className="ml-2">TL-BR</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="diagonal-bl-tr"
            aria-label="Diagonal bottom-left to top-right"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <ArrowUpRight className="size-4" />
            <span className="ml-2">BL-TR</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Color Picker */}
      <div className="space-y-2">
        <Label className="text-gray-700">Color</Label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className={`size-8 rounded-full border-2 transition-all ${
                color === colorOption
                  ? 'scale-110 border-gray-800'
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
              aria-label={`Select color ${colorOption}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}