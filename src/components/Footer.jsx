import React, { useEffect, useState } from "react";
import fsclogo from "/fcs_logo.png"
const Footer = () => {
  const [scale, setScale] = useState(1); // State to manage the scale of the dot

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const newScale = 1 + scrollPosition * 0.001; // Adjust the multiplier for sensitivity
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-black text-white p-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* Solutions Section */}
        <div>
          <h3 className="font-bold text-lg">Solutions</h3>
          <ul className="mt-2 space-y-1 text-gray-400">
            <li>Digital Strategy & Design</li>
            <li>Application Development and Management</li>
            <li>Cloud & Infrastructure</li>
            <li>Software-as-a-Service</li>
            <li>Digital & Brand Marketing</li>
            <li className="text-white font-semibold">
              Generative AI & Business Intelligence
            </li>
            <li>Network Connectivity</li>
            <li>ERP Solutions</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-bold text-lg">Company</h3>
          <ul className="mt-2 space-y-1 text-gray-400">
            <li>Events</li>
            <li>Why Us</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Partners & Certifications</li>
            <li>Reviews & Awards</li>
            <li>Blog</li>
            <li>Case Studies</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>

      {/* Subscription and Consultation Section */}
      <div className="mt-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Don’t miss out updates"
            className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md"
          />
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <input type="checkbox" className="mr-2" /> I agree to the Privacy
            Policy
          </div>
          <button className="mt-4 md:mt-10 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
            Send ➜
          </button>
        </div>
        <div
          className="hidden md:block w-15 h-auto mx-auto"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <img src={fsclogo} alt="FCSLogo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
