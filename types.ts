
export interface VideoInfo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export type AppState = 'idle' | 'loading' | 'preview';
