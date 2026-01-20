'use client';

import { useState, useEffect, useRef } from 'react';
import { ConversationList } from '@/components/ui/ConversationList';
import { MessageList } from '@/components/ui/MessageList';
import { MessageInput } from '@/components/ui/MessageInput';
import { mockClientUsers } from '@/lib/mock-data';

export default function EmployeeMessagingPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/messages/conversations');
      const data = await response.json();
      
      if (data.success) {
        setConversations(data.conversations || []);
        if (data.conversations?.length > 0) {
          setSelectedConversationId(data.conversations[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/messages/${conversationId}`);
      const data = await response.json();
      
      if (data.success) {
        const transformedMessages = data.messages.map((msg: any) => {
          const sender = mockClientUsers.find(u => u.id === msg.senderId) || { name: 'Unknown' };
          return {
            id: msg.id,
            senderName: sender.name || 'Unknown',
            senderAvatar: sender.name?.[0]?.toUpperCase() || '👤',
            content: msg.content,
            timestamp: msg.createdAt,
            isOwn: msg.senderId === 'emp-001',
            messageType: msg.messageType,
          };
        });
        setMessages(transformedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversationId || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(`/api/messages/${selectedConversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      
      if (data.success) {
        const newMessage = {
          id: data.message.id,
          senderName: 'You',
          senderAvatar: '👤',
          content: data.message.content,
          timestamp: data.message.createdAt,
          isOwn: true,
          messageType: 'text',
        };
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const currentConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <div className="mb-4 text-5xl">💼</div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            TEAM <span className="text-green-400">COMMUNICATIONS</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-4 max-w-2xl">
            Collaborate with your team, chat with clients, and communicate with admin support.
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId || undefined}
          onSelectConversation={setSelectedConversationId}
          isLoading={isLoading}
        />

        {selectedConversationId ? (
          <div className="flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 bg-slate-800/30">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {currentConversation?.name || 'Chat'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {currentConversation?.type === 'direct'
                  ? 'Direct message'
                  : `${currentConversation?.participantCount || 0} members`}
              </p>
            </div>

            <MessageList messages={messages} isLoading={isSending} />
            <MessageInput
              onSendMessage={handleSendMessage}
              isLoading={isSending}
              placeholder="Type your message..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗨️</div>
              <p className="text-slate-500 italic font-medium">No conversation selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
