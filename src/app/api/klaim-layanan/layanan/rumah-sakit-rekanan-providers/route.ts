import { NextRequest, NextResponse } from "next/server";
import { handleGetProvider } from "@/services/provider-service.api";

export async function GET(request: NextRequest) {
    const city_contain = request.nextUrl.searchParams.get('city_contain') || '';
    const name_contain = request.nextUrl.searchParams.get('name_contain') || '';
    const queryParams = {
        page: '1',
        city_contain,
        name_contain
    }
    const data = await handleGetProvider(queryParams)
    return NextResponse.json(data, { status: 200 });
}