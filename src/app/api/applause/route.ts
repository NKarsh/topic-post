import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request): Promise<Response> {
  try {
    const { db } = await connectToDatabase();
    const { postId } = await request.json();

    if (!ObjectId.isValid(postId)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    const result = await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(postId) }, { $inc: { applause: 1 } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Applause added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not add applause", error },
      { status: 500 }
    );
  }
}
