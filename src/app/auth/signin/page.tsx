"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  //   const csrfToken = await getCsrfToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const response = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // TODO: use page router?
    if (response.ok) {
      window.location.href = "/reservation/manage";
    }
    console.log(response);
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" />
        <div>
          <label>Email:</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
