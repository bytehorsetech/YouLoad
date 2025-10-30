
import React, { useState } from 'react';
import { ArrowRightIcon, YouTubeIcon, FolderIcon } from './icons';

interface URLInputFormProps {
  onAnalyze: (url: string) => void;
  savePath: string;
}

const URLInputForm: React.FC<URLInputFormProps> = ({ onAnalyze, savePath }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };
  
  const handleBrowseClick = () => {
    alert('Folder selection is for demonstration purposes only. Due to browser security restrictions, websites cannot access your local file system.');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <YouTubeIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block pl-11 p-3 transition duration-300"
          />
        </div>
        
        <div>
            <label htmlFor="save-path" className="sr-only">Save Path</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FolderIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="save-path"
                    value={savePath}
                    readOnly
                    className="w-full bg-slate-700/50 border border-slate-600 text-slate-300 text-sm rounded-lg block pl-11 p-3 pr-24"
                />
                <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="absolute inset-y-0 right-0 mr-1.5 my-1.5 px-4 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
                >
                    Browse...
                </button>
            </div>
        </div>
        
        <button
          type="submit"
          disabled={!url.trim()}
          className="group flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          <span>Analyze Video</span>
          <ArrowRightIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default URLInputForm;
