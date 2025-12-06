import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-Demand Revalidation API Route
 *
 * This endpoint allows Sanity CMS to trigger revalidation when content changes.
 *
 * Usage:
 * POST https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATION_SECRET
 *
 * Body (optional):
 * {
 *   "path": "/",           // Specific path to revalidate (default: "/")
 *   "tag": "menuItem"      // Cache tag to revalidate (optional)
 * }
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      {
        message: 'Invalid token',
        error: 'Secret token is required and must match REVALIDATION_SECRET'
      },
      { status: 401 }
    )
  }

  try {
    // Parse request body (optional)
    let body: { path?: string; tag?: string } = {}

    try {
      body = await request.json()
    } catch {
      // No body provided, use defaults
    }

    const pathToRevalidate = body.path || '/'
    const tagToRevalidate = body.tag

    console.log('🔄 Revalidation triggered:')
    console.log('   Path:', pathToRevalidate)
    console.log('   Tag:', tagToRevalidate || 'none')

    // Revalidate by path
    revalidatePath(pathToRevalidate)

    // Revalidate by tag if provided
    if (tagToRevalidate) {
      revalidateTag(tagToRevalidate, 'max')
    }

    return NextResponse.json(
      {
        revalidated: true,
        path: pathToRevalidate,
        tag: tagToRevalidate,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Also support GET for testing (less secure, use POST in production)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path') || '/'
  const tag = searchParams.get('tag')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }

  try {
    revalidatePath(path)

    if (tag) {
      revalidateTag(tag, 'max')
    }

    return NextResponse.json(
      {
        revalidated: true,
        path,
        tag,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
