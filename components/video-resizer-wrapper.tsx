"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const VideoResizerComponent = dynamic(
  () => import('@/components/video-resizer').then((mod) => mod.VideoResizer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-12 text-blue-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
);

export default function VideoResizerWrapper() {
  return <VideoResizerComponent />;
}
