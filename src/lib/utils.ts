import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
