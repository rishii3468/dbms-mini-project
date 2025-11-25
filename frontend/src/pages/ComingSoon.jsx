import React from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-green-700 text-5xl font-extrabold mb-4">Coming Soon</h1>
      <p className="text-green-700 text-lg mb-8">
        We are working hard to bring you something amazing!
      </p>
      <Link
        to="/"
        className="text-green-600 border border-green-700 px-6 py-2 rounded-lg hover:bg-green-700 hover:text-white transition"
      >
        Home
      </Link>
    </div>
  );
}
