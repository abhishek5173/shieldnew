import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-start bg-white px-4 py-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="w-full max-w-5xl h-[80vh] overflow-y-auto space-y-6 pr-2">
        <button
          onClick={() => navigate("/about/upcst")}
          className="w-full text-lg text-gray-700 hover:text-indigo-600 transition border-b pb-2"
        >
          About UPCST
        </button>
        <button
          onClick={() => navigate("/about/grant")}
          className="w-full text-lg text-gray-700 hover:text-indigo-600 transition border-b pb-2"
        >
          About Grant
        </button>
        <button
          onClick={() => navigate("/about/team")}
          className="w-full text-lg text-gray-700 hover:text-indigo-600 transition border-b pb-2"
        >
          About Team
        </button>
        <button
          onClick={() => navigate("/about/shield")}
          className="w-full text-lg text-gray-700 hover:text-indigo-600 transition border-b pb-2"
        >
          About Shield
        </button>
      </div>
    </div>
  );
}
