import { NextRequest, NextResponse } from 'next/server';
import { getContentCategory } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category') || '';
    const channelFilter =
      request.nextUrl.searchParams.get('channelFilter') || '';

    if (category && category !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        category
      };
      const data = await getContentCategory('List-loker', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    if (channelFilter && channelFilter !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        channelFilter
      };
      const data = await getContentCategory('List-loker', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    const queryParams: QueryParams = {
      includeAttributes: 'true'
    };
    const data = await getContentCategory('List-loker', queryParams);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error on fetch content category' },
      { status: 500 }
    );
  }
}
