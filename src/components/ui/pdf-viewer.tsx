import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PDFViewer({ file, fallbackImage }: { file: string, fallbackImage?: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(e: any) {
    console.error(e);
    setError(true);
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (error && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt="项目详情 fallback"
        className="w-full h-auto object-cover overflow-hidden shadow-sm"
      />
    );
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col justify-center items-center">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        className="flex flex-col items-center w-full"
        loading={
          <div className="flex items-center justify-center p-20 text-[#111111]/40 text-sm tracking-wide">
            Loading PDF / 正在加载PDF元件...
          </div>
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="w-full flex justify-center bg-white overflow-hidden shadow-sm">
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={containerWidth ? containerWidth : undefined}
              loading={<div className="h-[500px] flex items-center justify-center">Loading page...</div>}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
