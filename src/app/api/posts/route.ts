import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Post } from '@/types';

export async function POST(req: Request) {
  try {
    const { title, content, topic } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const newPost: Post = {
      date: new Date(),
      topic,
      title,
      content,
      applause: 0,
    };

    const result = await db.collection('posts').insertOne(newPost);

    const createdPost = {
      _id: result.insertedId,
      ...newPost,
    };


    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Could not create post', error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get('topic');

    if (!topic) {
      return NextResponse.json({ message: 'Topic is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const posts = await db.collection('posts').find({ topic }).toArray();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Could not retrieve posts', error }, { status: 500 });
  }
}