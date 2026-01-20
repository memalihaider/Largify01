import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/messages/[conversationId]
 * Get all messages in a conversation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const { conversationId } = await params;
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );

    // Mock implementation - get conversation messages
    const messages = mockMessages
      .filter(m => m.conversationId === conversationId && !m.isDeleted)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Update last read timestamp
    mockConversationParticipants.forEach(p => {
      if (p.conversationId === conversationId && p.userId === decoded.clientId) {
        p.lastReadAt = new Date().toISOString();
      }
    });

    return NextResponse.json({
      success: true,
      messages,
      totalCount: messages.length,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/messages/[conversationId]
 * Send a message to a conversation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const { conversationId } = await params;
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );

    const body = await request.json();
    const { content, messageType = 'text', attachments = null, replyTo = null } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty' },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: decoded.clientId,
      content: content.trim(),
      messageType,
      attachments,
      replyTo,
      isEdited: false,
      editedAt: null,
      isDeleted: false,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockMessages.push(newMessage);

    // Update conversation last message
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.updatedAt = new Date().toISOString();
    }

    return NextResponse.json(
      {
        success: true,
        message: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// Mock data (same as conversations route)
const mockConversations: any[] = [
  {
    id: 'conv-admin-client-001',
    name: 'Ahmed Al-Rashid Support',
    type: 'direct',
    createdBy: 'admin-001',
    description: null,
    isArchived: false,
    metadata: {},
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'conv-team-general',
    name: 'Team General',
    type: 'group',
    createdBy: 'admin-001',
    description: 'General team communications',
    isArchived: false,
    metadata: {},
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

const mockConversationParticipants: any[] = [
  {
    id: 'part-admin-001',
    conversationId: 'conv-admin-client-001',
    userId: 'admin-001',
    role: 'admin',
    joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastReadAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isMuted: false,
  },
  {
    id: 'part-client-001',
    conversationId: 'conv-admin-client-001',
    userId: 'client-001',
    role: 'member',
    joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastReadAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isMuted: false,
  },
];

const mockMessages: any[] = [
  {
    id: 'msg-001',
    conversationId: 'conv-admin-client-001',
    senderId: 'admin-001',
    content: 'Hi Ahmed! How can I assist you today?',
    messageType: 'text',
    attachments: null,
    replyTo: null,
    isEdited: false,
    isDeleted: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-002',
    conversationId: 'conv-admin-client-001',
    senderId: 'client-001',
    content: 'Hi! I have a question about my active project - the security module implementation.',
    messageType: 'text',
    attachments: null,
    replyTo: null,
    isEdited: false,
    isDeleted: false,
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
  },
];
