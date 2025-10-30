
import React, { useState, useEffect, useRef } from 'react';
import { VideoInfo } from '../types';
import { DownloadIcon, RefreshIcon, CheckIcon } from './icons';

interface VideoPreviewCardProps {
  videoInfo: VideoInfo;
  onReset: () => void;
  savePath: string;
}

const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({ videoInfo, onReset, savePath }) => {
  const [quality, setQuality] = useState('1080p (Full HD)');
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (downloadState === 'downloading') {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDownloadState('complete');
            return 100;
          }
          // Simulate a more realistic, variable progress speed
          const increment = Math.random() * 5;
          return Math.min(prev + increment, 100);
        });
      }, 150);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [downloadState]);

  const handleDownloadClick = () => {
    if (downloadState === 'idle') {
      setProgress(0);
      setDownloadState('downloading');
    }
  };
  
  return (
    <div className="w-full bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 animate-fade-in">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={videoInfo.thumbnailUrl} alt="Video thumbnail" />
            </div>
            <div className="p-6 flex flex-col justify-between">
                <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold">{videoInfo.id}</div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-white">{videoInfo.title}</h2>
                    <p className="mt-2 text-slate-400 text-sm">{videoInfo.description}</p>
                </div>
            </div>
        </div>
        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex flex-col sm:flex-row items-center gap-4">
             <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="quality-select" className="sr-only">Select quality</label>
                <select 
                    id="quality-select"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    disabled={downloadState !== 'idle'}
                    className="w-full bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option>1080p (Full HD)</option>
                    <option>720p (HD)</option>
                    <option>480p (SD)</option>
                    <option>360p</option>
                </select>
            </div>
            <div className="flex-grow sm:flex-grow-0 w-full sm:w-auto">
                {downloadState === 'idle' ? (
                    <button
                        onClick={handleDownloadClick}
                        className="group w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300"
                    >
                        <DownloadIcon className="h-5 w-5" />
                        <span>Download</span>
                    </button>
                ) : (
                    <div className="w-full sm:w-40 h-[42px] flex flex-col justify-center items-center px-6" aria-live="polite">
                        {downloadState === 'downloading' && (
                            <>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full transition-all duration-150 ease-linear" 
                                        style={{ width: `${Math.round(progress)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-1.5 whitespace-nowrap">
                                    Downloading... {Math.round(progress)}%
                                </p>
                            </>
                        )}
                        {downloadState === 'complete' && (
                             <div className="text-center">
                                <span className="flex items-center justify-center gap-1.5 text-green-400 font-semibold">
                                    <CheckIcon className="h-4 w-4" />
                                    Download Complete
                                </span>
                                <p className="text-xs text-slate-500 mt-1 w-36 truncate" title={savePath}>
                                    Saved to: {savePath}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button
                onClick={onReset}
                title="Start Over"
                className="group flex-shrink-0 flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-bold p-2.5 rounded-lg transition-all duration-300"
            >
                <RefreshIcon className="h-5 w-5 transform group-hover:rotate-90 transition-transform" />
                 <span className="sr-only">Start Over</span>
            </button>
        </div>
    </div>
  );
};

export default VideoPreviewCard;
