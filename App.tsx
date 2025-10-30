
import React, { useState, useCallback } from 'react';
import { AppState, VideoInfo } from './types';
import { fetchVideoInfo } from './services/mockGeminiService';
import URLInputForm from './components/URLInputForm';
import VideoPreviewCard from './components/VideoPreviewCard';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savePath, setSavePath] = useState<string>('C:\\Users\\You\\Downloads\\YouLoad');

  const handleAnalyze = useCallback(async (url: string) => {
    setAppState('loading');
    setError(null);
    try {
      const info = await fetchVideoInfo(url);
      setVideoInfo(info);
      setAppState('preview');
    } catch (e) {
      setError('Could not analyze the video. Please check the URL and try again.');
      setAppState('idle');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');
    setVideoInfo(null);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <Spinner />;
      case 'preview':
        return videoInfo ? (
          <VideoPreviewCard videoInfo={videoInfo} onReset={handleReset} savePath={savePath} />
        ) : null;
      case 'idle':
      default:
        return (
          <>
            <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">YouLoad</h1>
                <p className="text-slate-400">Enter a YouTube URL to get started.</p>
            </div>
            {error && <p className="text-red-400 text-center mb-4 bg-red-900/50 p-3 rounded-lg">{error}</p>}
            <URLInputForm onAnalyze={handleAnalyze} savePath={savePath} />
          </>
        );
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-indigo-500/10 p-6 sm:p-8">
            {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-slate-500 text-sm">
        <p>
            YouLoad is a UI/UX concept. Video downloading from YouTube is subject to their terms of service.
        </p>
         <p className="mt-1">
            &copy; {new Date().getFullYear()} YouLoad. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
