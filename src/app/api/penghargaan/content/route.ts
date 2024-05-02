import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';

export async function GET(request: NextRequest) {
  const searchFilter = request.nextUrl.searchParams.get('searchFilter') || '';

  if (searchFilter && searchFilter !== 'undefined') {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      searchFilter
    };
    const data = await getContent('List-penghargaan', queryParams);
    return NextResponse.json(data, { status: 200 });
  }

  const queryParams: QueryParams = {
    includeAttributes: 'true',
    searchFilter
  };
  const data = await getContent('List-penghargaan', queryParams);
  return NextResponse.json(data, { status: 200 });
}
