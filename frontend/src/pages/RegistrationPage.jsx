import React, { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data.message || "Registration complete!");

    if (data.message?.includes("success")) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-green-50 bg-cover bg-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80")',
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md bg-white/90 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 sm:p-3 border border-green-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-sm sm:text-base"
            required
          />

          {/* Email */}
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 sm:p-3 border border-green-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-sm sm:text-base"
            required
          />

          {/* Password */}
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 sm:p-3 border border-green-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        {/* Result message */}
        <p className="text-center text-green-800 font-medium mt-4 text-sm sm:text-base">
          {result}
        </p>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-3">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}