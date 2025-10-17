import { dbConnect } from "@/database/dbConfig";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helper/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //validation
    const isUserExsit = await User.findOne({ email });

    if (isUserExsit) {
      return NextResponse.json(
        { error: "user already present" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPass,
    });

    await user.save();
    console.log(user);

    //verification mail
    await sendMail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json({
      message: "user regiter succeessfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
