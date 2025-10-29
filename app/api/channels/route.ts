import { NextRequest } from "next/server";
import { listChannels, createChannel } from "@/lib/mockApi/api";
import { ChannelQuery } from "@/lib/mockApi/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q: ChannelQuery = {
    search: searchParams.get("search") || undefined,
    platform: (searchParams.get("platform") as any) || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sort: (searchParams.get("sort") as any) || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
  };
  try {
    const data = await listChannels(q);
    return Response.json(data);
  } catch (e: any) {
    return Response.json({ title: e.title || "Error", detail: e.message }, { status: e.status || 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const body = await req.json();
  try {
    const data = await createChannel(token || undefined, body);
    return Response.json(data, { status: 201 });
  } catch (e: any) {
    return Response.json({ title: e.title || "Error", detail: e.message }, { status: e.status || 500 });
  }
}
