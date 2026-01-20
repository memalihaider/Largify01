import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/messages/conversations
 * Get all conversations for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );

    // Mock implementation - returns user's conversations
    const userConversations = mockConversations.filter(conv =>
      mockConversationParticipants.some(
        p => p.conversationId === conv.id && p.userId === decoded.clientId
      )
    );

    return NextResponse.json({
      success: true,
      conversations: userConversations.map(conv => ({
        ...conv,
        lastMessage: mockMessages
          .filter(m => m.conversationId === conv.id)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0],
        participantCount: mockConversationParticipants.filter(
          p => p.conversationId === conv.id
        ).length,
      })),
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/messages/conversations
 * Create a new conversation (direct or group)
 */
export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );

    const body = await request.json();
    const { type, participantIds, name } = body;

    if (!type || !participantIds || participantIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: type, participantIds' },
        { status: 400 }
      );
    }

    // Check if direct conversation already exists
    if (type === 'direct' && participantIds.length === 1) {
      const existingConv = mockConversations.find(
        conv =>
          conv.type === 'direct' &&
          mockConversationParticipants.some(
            p =>
              p.conversationId === conv.id &&
              (p.userId === decoded.clientId || p.userId === participantIds[0])
          )
      );

      if (existingConv) {
        return NextResponse.json({
          success: true,
          conversation: existingConv,
          isNew: false,
        });
      }
    }

    // Create new conversation
    const newConversation = {
      id: `conv-${Date.now()}`,
      name: name || 'New Conversation',
      type,
      createdBy: decoded.clientId,
      description: null,
      isArchived: false,
      metadata: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockConversations.push(newConversation);

    // Add participants
    const allParticipants = [decoded.clientId, ...participantIds];
    allParticipants.forEach(userId => {
      mockConversationParticipants.push({
        id: `part-${Date.now()}-${userId}`,
        conversationId: newConversation.id,
        userId,
        role: userId === decoded.clientId ? 'admin' : 'member',
        joinedAt: new Date().toISOString(),
        lastReadAt: new Date().toISOString(),
        isMuted: false,
      });
    });

    return NextResponse.json(
      {
        success: true,
        conversation: newConversation,
        isNew: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

// Mock data
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
