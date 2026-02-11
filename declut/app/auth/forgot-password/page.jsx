"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {supabase} from "@/lib/supabaseClient";

import "./forgot-password.css";

export default function ForgotPassword() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      alert("Reset link sent again!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="Navbar">
        <div className="logo"><h3>Declut</h3></div>
        <div className="hamburger" onClick={toggleSidebar}>&#9776;</div>
        <div className={`information ${sidebarOpen ? "open" : ""}`}>
          <Link href="#">Sustainable</Link>
          <Link href="#">About us</Link>
          <button className="btn">Support</button>
        </div>
      </div>

      {/* Forgot Password Section */}
      <div className="ForgotPassword">
        {/* Highlighted Info Card */}
        <div className="ForgotPassword-card first-card">
          <h3>Reset your password</h3>
          <p>Don't worry, we'll help you get back to your account</p>
        </div>

        {/* Form Card */}
        <div className="ForgotPassword-card form-card">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="ForgotPassword-form">
                <h2>Enter your email address</h2>
                <p className="instruction-text">
                  We'll send you a link to reset your password
                </p>

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                {/* Email Input Field */}
                <input 
                  type="email" 
                  placeholder="Enter your Email@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                {/* Back to Login */}
                <div className="back-to-login">
                  <Link href="/auth/Login">
                    ← Back to Login
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Check your email</h2>
              <p className="success-text">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <supabase />
              <p className="info-text">
                Didn't receive the email? Check your spam folder or 
                <button 
                  type="button" 
                  className="resend-btn"
                  onClick={handleResend}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "try again"}
                </button>
              </p>
              <button 
                type="button" 
                className="submit-btn"
                onClick={() => router.push("/auth/Login")}
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
