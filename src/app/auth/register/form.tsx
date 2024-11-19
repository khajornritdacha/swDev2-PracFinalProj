"use client";

import userRegister from "@/libs/userRegister";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";

// TODO: handle form validation
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await userRegister(name, tel, email, password);
      //   TODO: add toaster for successfuly register
      setName("");
      setTel("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("ลงทะเบียนไม่สำเร็จ");
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
          ลงทะเบียน
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <Box className="text-left">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary mb-1"
              style={{ color: "#D32F2F" }}
            >
              ชื่อ-สกุล
            </label>
            <TextField
              id="name"
              type="name"
              placeholder="ชื่อ นามสกุล"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-gray-50"
            />
          </Box>

          {/* Tel Input */}
          <Box className="text-left">
            <label
              htmlFor="tel"
              className="block text-sm font-medium text-primary mb-1"
              style={{ color: "#D32F2F" }}
            >
              เบอร์โทร
            </label>
            <TextField
              id="tel"
              type="tel"
              placeholder="0801112222"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-gray-50"
            />
          </Box>

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
            ลงทะเบียน
          </Button>
        </form>

        {/* Registration Link */}
        <Typography
          variant="body2"
          className="mt-6"
          style={{ fontSize: "14px", color: "#757575" }}
        >
          ผู้ใช้เดิม?{" "}
          <Link
            href="/auth/signin"
            className="font-medium underline"
            style={{ color: "#D32F2F" }}
          >
            เข้าสู่ระบบ
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
