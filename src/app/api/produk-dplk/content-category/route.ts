import { NextRequest, NextResponse } from "next/server";
import { getContentCategory } from "@/services/content-page.api";
import { QueryParams } from "@/utils/httpService";

export async function GET(request: NextRequest) {
	try {
		const channelFilter = request.nextUrl.searchParams.get('channelFilter') || '';	
		const searchFilter = request.nextUrl.searchParams.get('searchFilter') || '';	

		if (channelFilter && channelFilter !== 'undefined') {
				const queryParams: QueryParams = { 
					includeAttributes: 'true',
					channelFilter
			};
			const data = await getContentCategory('Produk-Avrast-DPLK', queryParams)
			return NextResponse.json(data, { status: 200 });
		}

		if (searchFilter && searchFilter !== 'undefined') {
			const queryParams: QueryParams = { 
				includeAttributes: 'true',
				searchFilter
		};
		const data = await getContentCategory('Produk-Avrast-DPLK', queryParams)
		return NextResponse.json(data, { status: 200 });
	}

		const queryParams: QueryParams = { 
				includeAttributes: 'true'
		};
		const data = await getContentCategory('Produk-Avrast-DPLK', queryParams)
		return NextResponse.json(data, { status: 200 });
	}
	catch (error){
		return NextResponse.json({ error: 'Error on fetch content category' }, { status: 500 });
	}
}