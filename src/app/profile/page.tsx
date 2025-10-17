"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      console.log(res);
      setData(res?.data.isUserExsit._id);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("logout successFuly");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl  p-3 rounded-2xl  text-center">Profile page</h1>
      <h2 className="text-3xl p-3 rounded-2xl  text-center text-black">
        {data == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>view Profile {data}</Link>
        )}
      </h2>
      <button onClick={logout} className=" bg-red-600 rounded-2xl border p-3">
        logout
      </button>
      <button
        onClick={getData}
        className=" bg-green-600 rounded-2xl border p-3"
      >
        get user data
      </button>
    </div>
  );
}

export default ProfilePage;
