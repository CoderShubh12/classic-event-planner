import dbConnect from "@/lib/dbConnect";
import Inquiry from "@/models/inquiry.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newInquiry = await Inquiry.create(body);

    // You can add code here to send an email notification to the company
    // using a service like Nodemailer, SendGrid, or a third-party API.

    return NextResponse.json(
      { success: true, data: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
