// src/app/login/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // In a real app, this would validate against a backend.
    // For now, we simulate a successful login by storing the name and email.
    login({ name: email.split("@")[0], email });
    router.push("/");
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-heading">
          <p>ACCOUNT</p>
          <h1>LOGIN</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="form-field">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="auth-submit">LOGIN</button>
          <button type="button" className="secondary-auth-button">FORGOT PASSWORD</button>
        </form>

        <div className="auth-switch">
          <p>DON'T HAVE AN ACCOUNT?</p>
          <button onClick={() => router.push("/register")}>CREATE ACCOUNT</button>
        </div>
      </div>
    </section>
  );
}