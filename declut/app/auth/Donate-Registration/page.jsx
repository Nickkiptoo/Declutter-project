"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./donate.css";

import sellIcon from "./icons/sell.svg";
import buyIcon from "./icons/buy.svg";
import Donate from "./icons/Donate.svg";
import eyeIcon from "./icons/eye.svg";       // eye open
import eyeOffIcon from "./icons/eye-off.svg"; // eye closed

export default function DonateRegistration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
          <form>
            <div className="Registration-btn">
              <button type="button">Login</button>
              <button type="button">Register</button>
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
                  className="card"
                  onClick={() => router.push("/auth/Donate-Registration")}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={Donate} alt="Donate icon" width={50} height={50} />
                  <h3>Donate</h3>
                </div>
              </div>

              {/* Input Fields */}
              <input type="text" placeholder="Enter your name eg John Doe" />
              <input type="text" placeholder="Enter your Email@gmail.com" />
              
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
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
                  placeholder="Confirm password"
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

              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
