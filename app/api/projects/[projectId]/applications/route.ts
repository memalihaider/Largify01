import { NextRequest, NextResponse } from 'next/server';

// Mock data store for applications
let projectApplications: Record<string, any[]> = {};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();

    if (!projectApplications[projectId]) {
      projectApplications[projectId] = [];
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      projectId,
      name: body.appName,
      type: body.appType,
      description: body.description,
      status: body.initialize ? 'initializing' : 'created',
      createdAt: new Date().toISOString(),
      version: '1.0.0',
      environment: 'development',
      initialize: body.initialize || false,
    };

    projectApplications[projectId].push(newApplication);

    // If initialize flag is set, mark it as ready after 2 seconds
    if (body.initialize) {
      setTimeout(() => {
        const app = projectApplications[projectId].find(a => a.id === newApplication.id);
        if (app) {
          app.status = 'ready';
        }
      }, 2000);
    }

    return NextResponse.json({
      success: true,
      application: newApplication,
      message: `Application ${body.initialize ? 'initialized' : 'created'} successfully`,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create application' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const applications = projectApplications[projectId] || [];

    return NextResponse.json({
      success: true,
      applications,
      total: applications.length,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
