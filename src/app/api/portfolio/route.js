import dbConnect from "@/lib/dbConnect";

import { NextResponse } from "next/server";
import slugify from "slugify";
import { withAuth } from "@/lib/authMiddleware";
import Portfolio from "@/models/portfolio.models";

// GET route to fetch all portfolio items (Public)
export async function GET() {
  await dbConnect();
  try {
    const portfolio = await Portfolio.find({});
    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// POST route to create a new portfolio item (Protected by Auth)
export const POST = withAuth(async (req) => {
  await dbConnect();
  try {
    const body = await req.json();

    // Generate a slug from the title for clean URLs
    const slug = slugify(body.title, { lower: true, strict: true });

    // Create the new portfolio item with the generated slug
    const portfolio = await Portfolio.create({ ...body, slug });

    return NextResponse.json(
      { success: true, data: portfolio },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
