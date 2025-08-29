import Image from 'next/image';
import WatermarkApp from '@/components/watermark-app/watermark-app';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <Image 
              src="/logo.png" 
              alt="WatermarkIt Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
            <Image 
              src="/name.png" 
              alt="WatermarkIt" 
              width={180} 
              height={40} 
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-gray-600">Add beautiful watermarks to your images</p>
        </header>
        <WatermarkApp />
      </div>
    </main>
  );
}