import { NextResponse } from 'next/server';
import { getPopUpModalHome } from '@/services/home-banner-modal-api';

export async function GET() {
  try {
    const data = await getPopUpModalHome('homepage-avras');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error on fetch content category' },
      { status: 500 }
    );
  }
}
