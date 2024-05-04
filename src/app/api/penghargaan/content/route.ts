import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';

export async function GET(request: NextRequest) {
  const searchFilter = request.nextUrl.searchParams.get('searchFilter') || '';
  const yearFilter = request.nextUrl.searchParams.get('yearFilter') || '';
  const monthFilter = request.nextUrl.searchParams.get('monthFilter') || '';

  if (searchFilter && searchFilter !== 'undefined') {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      searchFilter
    };
    const data = await getContent('List-penghargaan', queryParams);
    return NextResponse.json(data, { status: 200 });
  }

  if (yearFilter && yearFilter !== 'undefined') {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      yearFilter
    };
    const data = await getContent('List-penghargaan', queryParams);
    return NextResponse.json(data, { status: 200 });
  }

  if (monthFilter && monthFilter !== 'undefined') {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      monthFilter
    };
    const data = await getContent('List-penghargaan', queryParams);
    return NextResponse.json(data, { status: 200 });
  }

  const queryParams: QueryParams = {
    includeAttributes: 'true',
    searchFilter,
    yearFilter,
    monthFilter
  };
  const data = await getContent('List-penghargaan', queryParams);
  return NextResponse.json(data, { status: 200 });
}
