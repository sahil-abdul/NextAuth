import { dbConnect } from "@/database/dbConfig";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
   

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "user not present" }, { status: 400 });
    }

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.isVerified = true;

    await user.save();
    return NextResponse.json(
      { message: "user verifid successfully ", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
