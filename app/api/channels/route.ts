import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    { error: { code: "DEPRECATED", message: "This route is deprecated. Use the external API base (NEXT_PUBLIC_API_BASE)/channels instead." } },
    { status: 410 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: { code: "DEPRECATED", message: "This route is deprecated. Use the external API base (NEXT_PUBLIC_API_BASE)/channels instead." } },
    { status: 410 }
  )
}
