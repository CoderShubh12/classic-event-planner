import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonial.model";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = params;
  try {
    const testimonial = await Testimonial.findOne({ slug });
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { slug } = params;
  try {
    const body = await req.json();

    // You can optionally generate a new slug if the clientName is being updated
    if (body.clientName) {
      body.slug = slugify(body.clientName, { lower: true, strict: true });
    }

    const testimonial = await Testimonial.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { slug } = params;
  try {
    const deletedTestimonial = await Testimonial.deleteOne({ slug });
    if (deletedTestimonial.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
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
}
