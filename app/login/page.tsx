"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);

      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error?.response?.data || error.message);
      toast.error(error?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          {loading ? "Processing..." : "Login"}
        </p>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none text-black"
            />
          </div>

          {/* Button */}
          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className={`mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition
              ${
                buttonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-medium text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;