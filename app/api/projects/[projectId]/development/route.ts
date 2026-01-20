import { NextRequest, NextResponse } from 'next/server';

// Mock data store for developments
let projectDevelopments: Record<string, any[]> = {};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();

    if (!projectDevelopments[projectId]) {
      projectDevelopments[projectId] = [];
    }

    const newDevelopment = {
      id: `dev-${Date.now()}`,
      projectId,
      title: body.title,
      description: body.description,
      priority: body.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projectDevelopments[projectId].push(newDevelopment);

    return NextResponse.json({
      success: true,
      development: newDevelopment,
      message: 'Development task created successfully',
    });
  } catch (error) {
    console.error('Error creating development:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create development task' },
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
    const developments = projectDevelopments[projectId] || [];

    return NextResponse.json({
      success: true,
      developments,
      total: developments.length,
    });
  } catch (error) {
    console.error('Error fetching developments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch developments' },
      { status: 500 }
    );
  }
}
