export const runtime = "nodejs";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // 2️⃣ Check password
    const validPassword = await bcryptjs.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // 3️⃣ Create token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // 4️⃣ Sign JWT
    const token = jwt.sign(
      tokenData,
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );

    // 5️⃣ Create response AND RETURN IT ✅
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response; // 🔥 THIS WAS MISSING
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}