// A simple example for a registration endpoint
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const { username, password } = await req.json();

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
