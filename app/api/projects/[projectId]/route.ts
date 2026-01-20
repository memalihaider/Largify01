import { NextRequest, NextResponse } from 'next/server';

// Mock data store
let mockProjects = [
  {
    id: 'proj-001',
    clientId: 'client-001',
    name: 'Security Module Implementation',
    description: 'Enterprise security audit and implementation framework',
    status: 'in_progress' as const,
    priority: 'high' as const,
    progress: 85,
    startDate: '2025-11-01',
    endDate: '2026-03-15',
    budget: 150000,
    spent: 127500,
    team: ['emp-001', 'emp-002', 'emp-003'],
    tasks: [
      { id: 'task-1', title: 'Security Assessment', status: 'done', progress: 100 },
      { id: 'task-2', title: 'Implementation Planning', status: 'done', progress: 100 },
      { id: 'task-3', title: 'Core Module Development', status: 'in_progress', progress: 85 },
      { id: 'task-4', title: 'Testing & QA', status: 'todo', progress: 0 },
      { id: 'task-5', title: 'Deployment', status: 'todo', progress: 0 },
    ],
    milestones: [
      { id: 'ms-1', title: 'Requirements Complete', date: '2025-12-15', completed: true },
      { id: 'ms-2', title: 'Design Review', date: '2026-01-15', completed: true },
      { id: 'ms-3', title: 'First Release', date: '2026-02-28', completed: false },
      { id: 'ms-4', title: 'Final Delivery', date: '2026-03-15', completed: false },
    ],
    risks: [
      { id: 'risk-1', title: 'Resource Availability', level: 'medium', mitigation: 'Cross-training backup team' },
      { id: 'risk-2', title: 'Scope Creep', level: 'high', mitigation: 'Strict change control process' },
    ],
    lastUpdate: new Date().toISOString(),
  },
];

/**
 * GET /api/projects/[projectId]
 * Get project details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/[projectId]
 * Update project details
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();

    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project with new data
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...body,
      lastUpdate: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      project: mockProjects[projectIndex],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[projectId]
 * Delete project
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const deletedProject = mockProjects[projectIndex];
    mockProjects = mockProjects.filter(p => p.id !== projectId);

    return NextResponse.json({
      success: true,
      project: deletedProject,
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
