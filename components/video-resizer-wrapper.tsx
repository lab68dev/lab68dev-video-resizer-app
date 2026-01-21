'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const VideoResizer = dynamic(
  () => import('./video-resizer').then((mod) => mod.VideoResizer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading Video Editor...
      </div>
    )
  }
);

export function VideoResizerWrapper() {
  return <VideoResizer />;
}
