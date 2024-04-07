
import { NextRequest, NextResponse } from "next/server";
import { getPageBy } from "@/services/klaim-layanan.api";

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get('slug');
    const data = await getPageBy(slug as string)
    return NextResponse.json(data, { status: 200 });
}
