import { NextResponse } from 'next/server';
import { getContentPage } from '@/services/content-page.api';

export async function GET() {
  const data = await getContentPage('produk-individu-hlm');

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store', // Disable caching
      Pragma: 'no-cache', // HTTP 1.0
      Expires: '0' // Proxies
    }
  });
}
