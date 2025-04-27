import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function getTrustScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  return 'text-red-500';
}

export function getTrustScoreLabel(score: number): string {
  if (score >= 90) return 'Authentic';
  if (score >= 70) return 'Likely Authentic';
  if (score >= 50) return 'Suspicious';
  return 'Likely Counterfeit';
}

export function getBarColorClass(score: number): string {
  if (score >= 90) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function calculateTrustScore(logoScore: number, textureScore: number, barcodeScore: number): number {
  // Calculate weighted average
  const weightedSum = logoScore * 0.4 + textureScore * 0.4 + barcodeScore * 0.2;
  return Math.round(weightedSum);
}
