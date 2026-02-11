"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import "./Login.css";

import eyeIcon from "./icons/eye.svg";
import eyeOffIcon from "./icons/eye-off.svg";

export default function Login() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to dashboard or home page after successful login
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
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

      {/* Login Section */}
      <div className="Login">
        {/* Highlighted Info Card */}
        <div className="Login-card first-card">
          <h3>Welcome back to Declut</h3>
          <p>Continue your sustainable journey with our community</p>
        </div>

        {/* Form Card */}
        <div className="Login-card form-card">
          <form onSubmit={handleLogin}>
            <div className="Login-form">
              <div className="form-header">
                <button 
                  type="button" 
                  className="active"
                >
                  Login
                </button>
                <button 
                  type="button"
                  onClick={() => router.push("/auth/Buyer-Registration")}
                >
                  Register
                </button>
              </div>

              <h2>Sign in to your account</h2>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Input Fields */}
              <input 
                type="email" 
                placeholder="Enter your Email@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Image
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  alt="Toggle password"
                  width={20}
                  height={20}
                  className="eye-icon"
                  onClick={togglePassword}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              {/* Divider */}
              <div className="divider">
                <span>or</span>
              </div>

              {/* Social Login Options */}
              <div className="social-login">
                <button 
                  type="button" 
                  className="social-btn google"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <span>Continue with Google</span>
                </button>
                <button 
                  type="button" 
                  className="social-btn facebook"
                  onClick={handleFacebookLogin}
                  disabled={loading}
                >
                  <span>Continue with Facebook</span>
                </button>
              </div>

              {/* Sign up link */}
              <p className="signup-text">
                Don't have an account? 
                <Link href="/auth/Buyer-Registration"> Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
