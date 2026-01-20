'use client';

interface MessageProps {
  id: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  messageType?: 'text' | 'system' | 'notification';
}

export function Message({
  id,
  senderName,
  senderAvatar,
  content,
  timestamp,
  isOwn,
  messageType = 'text',
}: MessageProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (messageType === 'system') {
    return (
      <div className="flex justify-center py-4">
        <span className="text-xs text-slate-500 italic">{content}</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
          isOwn
            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
            : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
        }`}
      >
        {senderAvatar || senderName[0].toUpperCase()}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} flex-1 max-w-xs`}>
        <div className="flex gap-2 items-center mb-1">
          <span className="text-xs font-black text-slate-300 uppercase">{senderName}</span>
          <span className="text-[10px] text-slate-600 italic">{formatTime(timestamp)}</span>
        </div>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
            isOwn
              ? 'bg-blue-600/20 text-blue-100 border border-blue-500/20'
              : 'bg-slate-800 text-slate-100 border border-white/5'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
