"use client";
import { sendError } from "next/dist/server/api-utils";
import React, { useState } from "react";

function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10 w-3/12"> 
        <h1 className="text-white font-bold text-xl">Generate a Prompt</h1>
        <input
          type="text"
          placeholder="Enter a prompt"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 block bg-neutral-700 text-white w-full rounded-md"
        />
        <button className="bg-blue-500 p-2 rounded-md block mt-2 text-white
        disabled:opacity-50" disabled={!prompt || loading}>
          {
            loading ? "Loading...": "Generate"
          }
        </button>

        {result && (
          <p className="text-xl font-bold text-white max-w-sm my-10">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

export default HomePage;
