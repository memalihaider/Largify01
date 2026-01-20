import { NextRequest, NextResponse } from 'next/server';

// Mock data store for asset requests
let projectAssets: Record<string, any[]> = {};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();

    if (!projectAssets[projectId]) {
      projectAssets[projectId] = [];
    }

    const newAsset = {
      id: `asset-${Date.now()}`,
      projectId,
      type: body.assetType,
      description: body.description,
      priority: body.priority,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      approvalStatus: 'awaiting-review',
    };

    projectAssets[projectId].push(newAsset);

    return NextResponse.json({
      success: true,
      asset: newAsset,
      message: 'Asset request submitted successfully',
    });
  } catch (error) {
    console.error('Error creating asset request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create asset request' },
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
    const assets = projectAssets[projectId] || [];

    return NextResponse.json({
      success: true,
      assets,
      total: assets.length,
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}
