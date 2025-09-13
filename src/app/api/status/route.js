// import dbConnect from "@/lib/dbConnect";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json(
      { success: true, message: "Database connected successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
