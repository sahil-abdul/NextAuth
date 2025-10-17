import { dbConnect } from "@/database/dbConfig";
import { getUserData } from "@/helper/getUserDataFromToken";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";


dbConnect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserData(request)

    const isUserExsit = await User.findById(userId).select("-password");

    if (!isUserExsit) {
      return NextResponse.json({ error: "user not exsit" }, { status: 400 });
    }

    return NextResponse.json({
      message: "user's data fetch successfully",
      success: true,
      isUserExsit,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
