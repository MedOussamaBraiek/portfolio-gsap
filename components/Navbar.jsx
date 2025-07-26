"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const Navbar = () => {
  const linkRefs = useRef([]);
  const navRef = useRef(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    // Animation des liens - apparition depuis le haut un par un
    gsap.fromTo(
      linkRefs.current,
      {
        opacity: 0,
        y: -50,
        scale: 0.8,
      },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.7)",
        stagger: 0.1, // 0.1s entre chaque lien
        delay: 0.3, // Délai avant le début
      }
    );
  }, []);

  // Fonction pour les effets hover avec GSAP
  const handleMouseEnter = (index) => {
    gsap.to(linkRefs.current[index], {
      scale: 1.1,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(linkRefs.current[index], {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  return (
    <nav
      ref={navRef}
      className="flex w-full items-center justify-between mt-10 z-50"
    >
      {links.map((link, index) => (
        <Link
          key={link.name}
          href={link.href}
          ref={(el) => (linkRefs.current[index] = el)}
          className="text-lg font-semibold text-gray-600 hover:text-purple-700 transition-colors duration-300 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
