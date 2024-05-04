import { NextRequest, NextResponse } from 'next/server';
import { getContentCategory } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category') || '';
    const searchFilter = request.nextUrl.searchParams.get('searchFilter') || '';
    const yearFilter = request.nextUrl.searchParams.get('yearFilter') || '';
    const monthFilter = request.nextUrl.searchParams.get('monthFilter') || '';

    if (category && category !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        category
      };
      const data = await getContentCategory('List-penghargaan', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    if (searchFilter && searchFilter !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        searchFilter
      };
      const data = await getContentCategory('List-penghargaan', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    if (yearFilter && yearFilter !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        yearFilter
      };
      const data = await getContentCategory('List-penghargaan', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    if (monthFilter && monthFilter !== 'undefined') {
      const queryParams: QueryParams = {
        includeAttributes: 'true',
        monthFilter
      };
      const data = await getContentCategory('List-penghargaan', queryParams);
      return NextResponse.json(data, { status: 200 });
    }

    const queryParams: QueryParams = {
      includeAttributes: 'true',
      searchFilter,
      yearFilter,
      monthFilter
    };

    const data = await getContentCategory('List-penghargaan', queryParams);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error on fetch content category' },
      { status: 500 }
    );
  }
}
