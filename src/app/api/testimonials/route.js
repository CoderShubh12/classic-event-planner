import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonial.model";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  await dbConnect();
  try {
    const testimonials = await Testimonial.find({});
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    // Generate slug from the clientName
    const slug = slugify(body.clientName, { lower: true, strict: true });

    // Create the testimonial, including the generated slug
    const testimonial = await Testimonial.create({ ...body, slug });

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
