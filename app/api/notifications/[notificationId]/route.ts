import { NextRequest, NextResponse } from 'next/server';

// Mock notifications (shared with parent route)
const mockNotifications: any[] = [
  {
    id: 'notif-001',
    userId: 'client-001',
    type: 'project_update',
    title: 'Active Builds Progress Update',
    message: 'Your security module implementation has reached 85% completion.',
    link: '/client/client-001/projects',
    isRead: false,
    readAt: null,
    metadata: {
      projectId: 'proj-001',
      progressPercentage: 85,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-002',
    userId: 'client-001',
    type: 'message',
    title: 'New message from support',
    message: 'Admin replied to your support ticket.',
    link: '/client/client-001/messages',
    isRead: false,
    readAt: null,
    metadata: {
      conversationId: 'conv-admin-client-001',
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-003',
    userId: 'client-001',
    type: 'task_completed',
    title: 'Infrastructure Task Complete',
    message: 'Task "Database Migration" has been marked as completed.',
    link: '/client/client-001/tasks',
    isRead: true,
    readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      taskId: 'task-001',
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-004',
    userId: 'client-001',
    type: 'application_deployed',
    title: 'Application Deployed',
    message: 'Your security audit application has been deployed to production.',
    link: '/client/client-001/applications',
    isRead: true,
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      applicationId: 'app-001',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * PATCH /api/notifications/[notificationId]
 * Mark notification as read
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  try {
    const { notificationId } = await params;
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );

    const body = await request.json();
    const { isRead } = body;

    // Find and update notification
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (!notification || notification.userId !== decoded.clientId) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    notification.isRead = isRead;
    if (isRead) {
      notification.readAt = new Date().toISOString();
    }

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
