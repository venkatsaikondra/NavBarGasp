"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import "./menu.css";

const MenuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/login", label: "Login" },
  {path:"/SignUp",label:"SignUp"},
  { path: "/contact", label: "Contact" },
  {path:"/profile",label:"Profile"},
];

const Menu = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linkWrappersRef = useRef<HTMLDivElement[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  /* ESC close */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* GSAP animation */
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isMenuOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });

      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.fromTo(
        linkWrappersRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.3,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container">
      {/* TOP BAR */}
      <div className="menu-bar">
        <Link href="/" className="menu-logo">
          NavBar
        </Link>
        <button className="menu-open" onClick={() => setIsMenuOpen(true)}>
          Menu
        </button>
      </div>

      {/* OVERLAY */}
      <div ref={overlayRef} className="menu-overlay">
        <div className="menu-overlay-bar">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            NavBar
          </Link>
          <button className="menu-close" onClick={() => setIsMenuOpen(false)}>
            Close
          </button>
        </div>

        <div className="menu-content">
          {/* LINKS */}
          <div className="menu-links">
            {MenuLinks.map((link, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) linkWrappersRef.current[i] = el;
                }}
                className="menu-link-wrapper"
              >
                <Link
                  href={link.path}
                  className="menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* INFO */}
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

        <div className="menu-preview">View Showreel</div>
      </div>
    </div>
  );
};

export default Menu;
