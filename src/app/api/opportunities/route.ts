import { dbConnect } from '@/lib/db'
import Opportunity from '@/models/Opportunity'
import { opportunitySchema } from '@/lib/validate'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  await dbConnect()
  const { searchParams } = req.nextUrl
  const type = searchParams.get('type')
  const q = searchParams.get('q')

  const filter: Record<string, unknown> = {}
  if (type && type !== 'all') filter.type = type
  if (q) filter.$text = { $search: q }

  const opps = await Opportunity.find(filter).sort({ createdAt: -1 }).limit(50).lean()
  return NextResponse.json(opps)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const parsed = opportunitySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const opp = await Opportunity.create({
    ...parsed.data,
    deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null,
  })
  return NextResponse.json(opp, { status: 201 })
}
