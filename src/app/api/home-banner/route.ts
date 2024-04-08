import { NextResponse } from "next/server";
import { getPopUpModalHome } from "@/services/home-banner-modal-api";

export async function GET() {
    const data = await getPopUpModalHome('Pop-Up-Awal?includeAttributes=true')
    return NextResponse.json(data, { status: 200 });
}