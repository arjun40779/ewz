'use client';

import { ExternalLink, Eye, X, Edit } from 'lucide-react';

export default function PreviewBanner() {
  const exitPreview = async () => {
    const response = await fetch('/api/exit-draft');
    if (response.ok) {
      globalThis.location.reload();
    }
  };

  const enableVisualEditing = () => {
    const currentUrl = new URL(globalThis.location.href);
    currentUrl.searchParams.set('visual', 'true');
    globalThis.location.href = currentUrl.toString();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        <span className="font-medium text-sm">
          Preview Mode: You are viewing draft content
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={enableVisualEditing}
          className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-3 h-3" />
          Visual Edit
        </button>

        <a
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded text-xs hover:bg-gray-800 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Edit in Studio
        </a>

        <button
          onClick={exitPreview}
          className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
        >
          <X className="w-3 h-3" />
          Exit Preview
        </button>
      </div>
    </div>
  );
}

