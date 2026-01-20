'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type your message...',
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (content.trim().length === 0) return;
    onSendMessage(content);
    setContent('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="flex gap-3 p-4 bg-slate-900/50 border-t border-white/5 rounded-b-3xl">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 resize-none max-h-[120px] font-medium"
      />
      <Button
        onClick={handleSendMessage}
        disabled={isLoading || content.trim().length === 0}
        className="h-12 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-2xl px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
      >
        {isLoading ? '...' : 'Send'}
      </Button>
    </div>
  );
}
