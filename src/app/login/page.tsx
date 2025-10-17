"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res);
      router.push("/profile");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl  p-3 rounded-2xl  text-center">
        {loading ? "proccesing" : "Login"}
      </h1>
      <div className="p-3 border rounded-2xl">
        <form onSubmit={login} className="flex flex-col items-center gap-2 p-1">
          <input
            type="text"
            placeholder="Email"
            className="bg-gray-400 text-black rounded-2xl p-3 m-2 border"
            value={user.email}
            onChange={(val) => setUser({ ...user, email: val.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-400 text-black rounded-2xl p-3 m-2 border"
            value={user.password}
            onChange={(val) => setUser({ ...user, password: val.target.value })}
            required
          />
          <button
            type="submit"
            className=" bg-gray-700 rounded-2xl border py-3 w-full"
          >
            {buttonDisable ? "Fill form" : "submit"}
          </button>
        </form>
      </div>
      <p className="text-center text-gray-400">
        Don't have an account ?{" "}
        <Link href={"/signup"} className="text-blue-400">
          SignUp
        </Link>
      </p>
    </div>
  );
}
