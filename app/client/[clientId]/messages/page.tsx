'use client';

import { use, useState, useEffect, useRef } from 'react';
import { ConversationList } from '@/components/ui/ConversationList';
import { MessageList } from '@/components/ui/MessageList';
import { MessageInput } from '@/components/ui/MessageInput';
import { mockClientUsers } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientMessagesPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);

  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  // Scroll to bottom when messages change
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
        // Transform messages to UI format
        const transformedMessages = data.messages.map((msg: any) => {
          const sender = mockClientUsers.find(u => u.id === msg.senderId) || { name: 'Unknown' };
          return {
            id: msg.id,
            senderName: sender.name || 'Unknown',
            senderAvatar: sender.name?.[0]?.toUpperCase() || '👤',
            content: msg.content,
            timestamp: msg.createdAt,
            isOwn: msg.senderId === clientId,
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
        // Add new message to UI
        const newMessage = {
          id: data.message.id,
          senderName: client?.name || 'You',
          senderAvatar: client?.name?.[0]?.toUpperCase() || '👤',
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

  const handleCreateConversation = async () => {
    // For demo, create a direct conversation with admin
    try {
      const response = await fetch('/api/messages/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'direct',
          participantIds: ['admin-001'], // Talk to admin
        }),
      });

      const data = await response.json();
      if (data.success && data.isNew) {
        await fetchConversations();
        setSelectedConversationId(data.conversation.id);
      }
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Client not found</p>
      </div>
    );
  }

  const currentConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <div className="mb-4 text-5xl">💬</div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            COMMUNICATIONS <span className="text-cyan-400">RELAY</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-4 max-w-2xl">
            Direct messaging with our support team and admin. Get instant assistance for your projects and inquiries.
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
        {/* Conversations Sidebar */}
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId || undefined}
          onSelectConversation={setSelectedConversationId}
          isLoading={isLoading}
        />

        {/* Chat Window */}
        {selectedConversationId ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
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

            {/* Messages */}
            <MessageList
              messages={messages}
              isLoading={isSending}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
              isLoading={isSending}
              placeholder="Type your message here..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗨️</div>
              <p className="text-slate-500 italic font-medium mb-6">No conversation selected</p>
              <button
                onClick={handleCreateConversation}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-wider rounded-2xl transition-colors"
              >
                + Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
