import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/notifications
 * Get all notifications for the current user
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

    // Mock implementation - return user notifications
    const notifications = mockNotifications
      .filter(n => n.userId === decoded.clientId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      totalCount: notifications.length,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// Mock notifications data
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
