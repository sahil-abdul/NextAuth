"use client";
import React from "react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl  p-3 rounded-2xl  text-center">Profile page</h1>
      <h1 className="text-3xl  p-3 rounded-2xl  text-center bg-green-500">
        {id}
      </h1>
    </div>
  );
}
