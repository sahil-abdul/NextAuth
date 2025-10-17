"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmail() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      axios.post("/api/users/verifyEmail", { token });
      setIsVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const tokenVal = window.location.search.split("=")[1];
    setToken(tokenVal || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl  p-3 rounded-2xl  text-center">VerifyEmail</h1>
      <h2>{token ? token : "noToken"}</h2>
      {isVerified && (
        <div>
          <h2>you are verifid</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>you are not verifid</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
