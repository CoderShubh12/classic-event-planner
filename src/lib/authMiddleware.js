import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function withAuth(handler) {
  return async (req, ...args) => {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed. No token provided.",
        },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      return handler(req, ...args);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Authentication failed. Invalid token." },
        { status: 401 }
      );
    }
  };
}
