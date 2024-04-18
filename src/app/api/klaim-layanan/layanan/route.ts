import { NextRequest, NextResponse } from "next/server";
import { getPageBy } from "@/services/klaim-layanan.api";
import { handleGetProvider } from "@/services/provider-service.api";

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get('slug');

    if (slug === 'isProviders') {
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
    const data = await getPageBy(slug as string)
    return NextResponse.json(data, { status: 200 });
}