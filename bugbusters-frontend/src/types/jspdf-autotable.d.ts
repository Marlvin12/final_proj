declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface AutoTableOptions {
    startY?: number;
    head?: string[][];
    body?: string[][];
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: Record<string, unknown>;
    styles?: Record<string, unknown>;
    alternateRowStyles?: Record<string, unknown>;
    margin?: Record<string, unknown>;
    tableWidth?: string | number;
  }

  export function autoTable(doc: jsPDF, options: AutoTableOptions): void;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

