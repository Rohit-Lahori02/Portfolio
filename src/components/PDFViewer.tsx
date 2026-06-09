import React, { useEffect } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

interface PDFViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  downloadName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, isOpen, onClose, downloadName }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName || title;
    a.click();
  };

  // page-width zoom removes the gray side gutters from the browser PDF renderer
  const iframeSrc = `${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-width`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-black border border-white/10"
        style={{ width: '88vw', height: '92vh', maxWidth: '960px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0 bg-black">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 truncate pr-4">
            {title}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-white/20 text-zinc-300 hover:bg-white hover:text-black transition-colors duration-200"
              style={{ cursor: 'default' }}
            >
              <FiDownload size={11} /> Download
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-white/20 text-zinc-300 hover:bg-white hover:text-black transition-colors duration-200"
              style={{ cursor: 'default' }}
            >
              <FiX size={13} />
            </button>
          </div>
        </div>

        {/* PDF — overflow hidden clips any residual gray chrome */}
        <div className="flex-1 overflow-hidden bg-black">
          <iframe
            src={iframeSrc}
            title={title}
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
