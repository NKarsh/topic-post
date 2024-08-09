import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    const topics = await db.collection('posts').distinct('topic');

    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Could not retrieve topics', error }, { status: 500 });
  }
}