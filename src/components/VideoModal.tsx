import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-6xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 text-white hover:text-gray-300 text-xl bg-white/10 backdrop-blur-sm rounded-full p-3 transition-all hover:scale-110 hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black shadow-2xl">
          <iframe
            src={videoUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Travel Story Video"
          ></iframe>
        </div>
        <div className="text-center mt-6">
          <p className="text-white text-lg font-light">Our Travel Story - Creating Memories Since 2010</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;