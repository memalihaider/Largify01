'use client';

import { Badge } from './Badge';

interface ConversationListProps {
  conversations: Array<{
    id: string;
    name: string;
    type: 'direct' | 'group' | 'admin_support' | 'team';
    lastMessage?: {
      content: string;
      createdAt: string;
    };
    unreadCount?: number;
    participantCount?: number;
  }>;
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  isLoading?: boolean;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  isLoading,
}: ConversationListProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admin_support':
        return '🆘';
      case 'group':
        return '👥';
      case 'team':
        return '👨‍💼';
      default:
        return '💬';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-80 bg-slate-900/50 border-r border-white/5 overflow-y-auto p-4 space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-slate-800/30 border border-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 bg-slate-900/50 border-r border-white/5 overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center p-6">
          <div>
            <div className="text-5xl mb-4">🗨️</div>
            <p className="text-slate-500 italic font-medium">No conversations</p>
            <p className="text-xs text-slate-600 mt-2">Start chatting to begin</p>
          </div>
        </div>
      ) : (
        <div className="space-y-1 p-2">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 group ${
                selectedConversationId === conv.id
                  ? 'bg-blue-600/20 border border-blue-500/40'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex gap-3 items-start">
                <div
                  className={`text-2xl flex-shrink-0 group-hover:scale-110 transition-transform ${
                    selectedConversationId === conv.id ? 'scale-110' : ''
                  }`}
                >
                  {getTypeIcon(conv.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center justify-between mb-1">
                    <h3 className="text-sm font-black text-white truncate uppercase tracking-tight">
                      {conv.name}
                    </h3>
                    {conv.unreadCount && conv.unreadCount > 0 && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/20 text-[10px] font-black px-2 py-0.5 flex-shrink-0">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {conv.lastMessage && (
                    <div className="flex gap-2 items-center">
                      <p className="text-xs text-slate-400 truncate line-clamp-1">
                        {conv.lastMessage.content}
                      </p>
                      <span className="text-[10px] text-slate-600 flex-shrink-0">
                        {formatTime(conv.lastMessage.createdAt)}
                      </span>
                    </div>
                  )}
                  {conv.participantCount && conv.type !== 'direct' && (
                    <p className="text-[10px] text-slate-600 mt-1">
                      {conv.participantCount} members
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
