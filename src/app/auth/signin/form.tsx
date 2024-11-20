"use client";

import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInForm({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: add toaster to error
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setError(res?.error || "เข้าสู่ระบบไม่สำเร็จ");
      }

      const callbackUrl =
        searchParams?.get("callbackUrl") || "/reservation/manage";
      router.push(callbackUrl);
    } catch {
      setError("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen bg-gray-100">
      <Box
        className="p-8 rounded-lg shadow-lg bg-white"
        style={{ maxWidth: "400px", textAlign: "center", borderRadius: "16px" }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          component="h1"
          className="mb-6 font-bold text-gray-800"
          style={{ fontSize: "24px" }}
        >
          เข้าสู่ระบบ
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="csrfToken" type="hidden" value={csrfToken} />

          {/* Email Input */}
          <Box className="text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary mb-1"
              style={{ color: "#D32F2F" }}
            >
              อีเมล
            </label>
            <TextField
              id="email"
              type="email"
              placeholder="john@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-gray-50"
            />
          </Box>

          {/* Password Input */}
          <Box className="text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary mb-1"
              style={{ color: "#D32F2F" }}
            >
              รหัสผ่าน
            </label>
            <TextField
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-gray-50"
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Typography
              color="error"
              className="mt-2 text-sm"
              style={{ color: "#D32F2F" }}
            >
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-4"
            style={{
              backgroundColor: "#D32F2F",
              color: "white",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "24px",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#B71C1C",
              },
            }}
          >
            เข้าสู่ระบบ
          </Button>
        </form>

        {/* Registration Link */}
        <Typography
          variant="body2"
          className="mt-6"
          style={{ fontSize: "14px", color: "#757575" }}
        >
          ผู้ใช้ใหม่?{" "}
          <Link
            href="/auth/register"
            className="font-medium underline"
            style={{ color: "#D32F2F" }}
          >
            ลงทะเบียน
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
