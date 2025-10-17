"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSingUp = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res);
      router.push("/login");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-950">
      <div>
        <div>
          <h1 className="text-4xl p-3 text-center">
            {loading ? "Loading" : "signUp"}
          </h1>
        </div>
        <form
          className="flex flex-col p-4 border rounded-2xl m-2"
          onSubmit={onSingUp}
        >
          {" "}
          <input
            type="text"
            placeholder="username"
            value={user?.username}
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="bg-gray-400 text-black rounded-2xl p-3 m-2 border"
          />{" "}
          <input
            required
            type="text"
            placeholder="Email"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-gray-400 text-black rounded-2xl p-3 m-2 border"
          />{" "}
          <input
            required
            type="password"
            placeholder="Password"
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-gray-400 text-black rounded-2xl p-3 m-2 border"
          />{" "}
          <button
            type="submit"
            className=" bg-gray-700 rounded-2xl border py-3"
          >
            {buttonDisable ? "Fill form" : "Create"}
          </button>
        </form>
        <p className="text-center text-gray-400">
          Have an account ?{" "}
          <Link href={"/login"} className="text-blue-400">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
