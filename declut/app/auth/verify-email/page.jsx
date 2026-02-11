"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import "./forgot-password.css";

export default function VerifyEmail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Check if email is already verified
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email_confirmed_at) {
        // Email already verified, redirect to dashboard
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError("No user found. Please register again.");
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) throw error;

      alert("Verification email sent again!");
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

      {/* Verify Email Section */}
      <div className="ForgotPassword">
        {/* Highlighted Info Card */}
        <div className="ForgotPassword-card first-card">
          <h3>Verify your email</h3>
          <p>We've sent you a verification link</p>
        </div>

        {/* Form Card */}
        <div className="ForgotPassword-card form-card">
          <div className="success-message">
            <div className="success-icon">📧</div>
            <h2>Check your inbox</h2>
            <p className="success-text">
              We've sent a verification email to your address. Click the link in the email to activate your account.
            </p>

            {/* Error Message */}
            {error && (
              <div className="error-message" style={{ marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <p className="info-text">
              Didn't receive the email? Check your spam folder or 
              <button 
                type="button" 
                className="resend-btn"
                onClick={handleResendEmail}
                disabled={loading}
              >
                {loading ? "Sending..." : "resend verification email"}
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
        </div>
      </div>
    </div>
  );
}
