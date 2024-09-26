import React from 'react';

interface StickerProps {
  content: string;
  userName: string;
  createdAt: string;
}

const Sticker: React.FC<StickerProps> = ({ content, userName, createdAt }) => {
  return (
    <div className="bg-white p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform">
      <p className="text-lg text-black text-center mb-2">{content}</p>
      <p className="text-sm text-zinc-900">- {userName}</p>
      <p className="text-xs text-zinc-800">{new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Sticker;