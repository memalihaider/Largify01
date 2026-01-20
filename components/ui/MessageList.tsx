'use client';

import { Message } from './Message';

interface MessageListProps {
  messages: Array<{
    id: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
    messageType?: 'text' | 'system';
  }>;
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-2">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <div className="text-4xl mb-4">💬</div>
            <p className="text-slate-500 italic font-medium">No messages yet</p>
            <p className="text-xs text-slate-600 mt-2">Start a conversation!</p>
          </div>
        </div>
      ) : (
        messages.map(message => (
          <Message
            key={message.id}
            {...message}
          />
        ))
      )}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="flex gap-1">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      )}
    </div>
  );
}
