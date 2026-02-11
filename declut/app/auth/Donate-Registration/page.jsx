"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import "./donate.css";

import sellIcon from "./icons/sell.svg";
import buyIcon from "./icons/buy.svg";
import Donate from "./icons/Donate.svg";
import eyeIcon from "./icons/eye.svg";
import eyeOffIcon from "./icons/eye-off.svg";

export default function DonateRegistration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            user_type: "donor",
          },
        },
      });

      if (error) throw error;

      // Redirect to email confirmation page or dashboard
      router.push("/auth/verify-email");
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

      {/* Registration Section */}
      <div className="Registration">
        {/* Highlighted Info Card */}
        <div className="Register-card first-card">
          <h3>Give your clothes a second chance</h3>
          <p>Join our sustainable community for buying, selling, and donating pre-loved items</p>
        </div>

        {/* Form Card */}
        <div className="Register-card form-card">
          <form onSubmit={handleRegister}>
            <div className="Registration-btn">
              <button 
                type="button"
                onClick={() => router.push("/auth/Login")}
              >
                Login
              </button>
              <button type="button" className="active">Register</button>
              <h4>I want to ...</h4>

              {/* Buy/Sell/Donate Cards */}
              <div className="action-cards">
                <div
                  className="card"
                  onClick={() => router.push("/auth/Buyer-Registration")}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={buyIcon} alt="Buy icon" width={50} height={50} />
                  <h3>Buy</h3>
                </div>

                <div
                  className="card"
                  onClick={() => router.push("/auth/Seller-Registration")}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={sellIcon} alt="Sell icon" width={50} height={50} />
                  <h3>Sell</h3>
                </div>

                <div
                  className="card active"
                  onClick={() => router.push("/auth/Donate-Registration")}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={Donate} alt="Donate icon" width={50} height={50} />
                  <h3>Donate</h3>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Input Fields */}
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name eg John Doe" 
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your Email@gmail.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
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

              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Image
                  src={showConfirmPassword ? eyeOffIcon : eyeIcon}
                  alt="Toggle password"
                  width={20}
                  height={20}
                  className="eye-icon"
                  onClick={toggleConfirmPassword}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
