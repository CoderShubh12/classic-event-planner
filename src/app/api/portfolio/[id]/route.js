import dbConnect from "@/lib/dbConnect";

import { NextResponse } from "next/server";
import { withAuth } from "@/lib/authMiddleware";
import slugify from "slugify";
import Portfolio from "@/models/portfolio.models";

// GET route to fetch a single portfolio item by its slug (Public)
export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = params;
  try {
    const portfolio = await Portfolio.findOne({ slug });
    if (!portfolio) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT route to update a portfolio item by its slug (Protected)
export const PUT = withAuth(async (req, { params }) => {
  await dbConnect();
  const { slug } = params;
  try {
    const body = await req.json();

    // If the title is being updated, generate a new slug
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const portfolio = await Portfolio.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!portfolio) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});

// DELETE route to delete a portfolio item by its slug (Protected)
export const DELETE = withAuth(async (req, { params }) => {
  await dbConnect();
  const { slug } = params;
  try {
    const deletedPortfolio = await Portfolio.deleteOne({ slug });
    if (deletedPortfolio.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
