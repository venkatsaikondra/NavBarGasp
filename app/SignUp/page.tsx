"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Signup = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      toast.success("Account created successfully")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisabled(
      !(user.email && user.password && user.username)
    )
  }, [user])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          {loading ? "Processing..." : "Sign Up"}
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            className="input"
          />

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="input"
          />

          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`rounded-lg px-4 py-2 text-white ${
              buttonDisabled
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
