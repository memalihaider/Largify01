import { NextRequest, NextResponse } from 'next/server';

// Mock projects data with real-time updates
const mockProjects = [
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
  {
    id: 'proj-002',
    clientId: 'client-001',
    name: 'Infrastructure Migration',
    description: 'Cloud infrastructure modernization and migration',
    status: 'planning' as const,
    priority: 'medium' as const,
    progress: 25,
    startDate: '2026-01-15',
    endDate: '2026-08-30',
    budget: 200000,
    spent: 15000,
    team: ['emp-002', 'emp-004'],
    tasks: [
      { id: 'task-6', title: 'Architecture Design', status: 'in_progress', progress: 60 },
      { id: 'task-7', title: 'Environment Setup', status: 'todo', progress: 0 },
      { id: 'task-8', title: 'Data Migration', status: 'todo', progress: 0 },
    ],
    milestones: [
      { id: 'ms-5', title: 'Architecture Approved', date: '2026-02-15', completed: false },
      { id: 'ms-6', title: 'Infrastructure Ready', date: '2026-04-30', completed: false },
    ],
    risks: [
      { id: 'risk-3', title: 'Downtime Risk', level: 'high', mitigation: 'Implement blue-green deployment' },
    ],
    lastUpdate: new Date().toISOString(),
  },
];

/**
 * GET /api/projects
 * Get all projects, optionally filtered by clientId
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    const projects = clientId
      ? mockProjects.filter(p => p.clientId === clientId)
      : mockProjects;

    return NextResponse.json({
      success: true,
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create new project
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientId,
      name,
      description,
      priority,
      budget,
      startDate,
      endDate,
    } = body;

    // Validation
    if (!clientId || !name || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      clientId,
      name,
      description,
      status: 'planning' as const,
      priority: priority || 'medium',
      progress: 0,
      startDate,
      endDate,
      budget: budget || 0,
      spent: 0,
      team: [],
      tasks: [],
      milestones: [],
      risks: [],
      lastUpdate: new Date().toISOString(),
    };

    // In production, save to database
    mockProjects.push(newProject);

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
