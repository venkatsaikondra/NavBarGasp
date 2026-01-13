"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import "./menu.css";

const MenuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/lab", label: "Lab" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="menu-container" ref={container}>
      {/* Top Bar */}
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">NavBar</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>

      {/* Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href="/" onClick={toggleMenu}>
              NavBar
            </Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>

        <div className="menu-copy">
          {/* Links */}
          <div className="menu-links">
            {MenuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div
                  className="menu-link-item-holder"
                  onClick={toggleMenu}
                >
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X ↗</a>
              <a href="#">Instagram ↗</a>
              <a href="#">LinkedIn ↗</a>
              <a href="#">Behance ↗</a>
              <a href="#">Dribbble ↗</a>
            </div>
            <div className="menu-info-col">
              <p>info@navbar.com</p>
              <p>+91 23422 32343</p>
            </div>
          </div>
        </div>

        <div className="menu-preview">
          <p>View Showreel</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
