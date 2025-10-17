import { dbConnect } from "@/database/dbConfig";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return NextResponse.json(
        { message: "user not exsit", success: false },
        { status: 400 }
      );
    }
    console.log(validUser);
    const isPassValid = await bcrypt.compare(password, validUser.password);

    if (!isPassValid) {
      return NextResponse.json(
        { message: "wrong password", success: false },
        { status: 400 }
      );
    }

    const tokenData = {
      id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    };

    const cookie = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "user login successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", cookie, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
