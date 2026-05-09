import { ReactNode } from 'react';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  background?: string;
  textColor?: string;
  icon?: ReactNode;
}

export type Theme = 'light' | 'dark' | 'brutal';
