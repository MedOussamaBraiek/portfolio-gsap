"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const paragraphRefs = useRef([]);
  const paragraphRefs2 = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    // SplitText pour le titre
    const titleSplit = new SplitText(titleRef.current, {
      type: "chars,words",
      charsClass: "char",
    });

    // SplitText pour les paragraphes
    const paragraphSplits = paragraphRefs.current.map(
      (p) => new SplitText(p, { type: "lines", linesClass: "line" })
    );
    const paragraphSplits2 = paragraphRefs2.current.map(
      (p) => new SplitText(p, { type: "lines", linesClass: "line" })
    );

    // Timeline principale
    const tl = gsap.timeline({ delay: 0.5 });

    // Animation du titre - chaque lettre
    tl.from(titleSplit.chars, {
      duration: 0.8,
      opacity: 0,
      y: 100,
      rotationX: -90,
      ease: "back.out(1.7)",
      stagger: {
        amount: 1,
        from: "start",
      },
    })

      // Animation de l'image
      .from(
        imageRef.current,
        {
          duration: 1.2,
          y: 300,
          opacity: 0,
          scale: 0.8,
          rotation: 15,
          ease: "power3.out",
        },
        "-=0.5"
      )

      // Animation des lignes du paragraphe
      .from(
        paragraphSplits.flatMap((split) => split.lines),
        {
          duration: 0.8,
          opacity: 0,
          x: -50,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.8"
      )
      // Animation des lignes du paragraphe2
      .from(
        paragraphSplits2.flatMap((split) => split.lines),
        {
          duration: 0.8,
          opacity: 0,
          x: -50,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.8"
      )

      // Animation du bouton
      .fromTo(
        buttonRef.current,
        {
          scale: 1.8,
          opacity: 0,
          rotation: 10,
        },
        {
          duration: 0.6,
          scale: 1,
          opacity: 1,
          rotation: 0,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

    // Nettoyage
    return () => {
      titleSplit.revert();
      paragraphSplits.forEach((split) => split.revert());
    };
  }, []);

  const paragraphLines = [
    "Software Engineer building robust,",
    "web and mobile solutions wit",
    "MERN, Flutter, and Kotlin.",
    "Passionate about creating scalable",
    "application and embracing new technologies.",
  ];

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculer la position relative au centre du container
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;

      // Réduire l'amplitude du mouvement (divisé par 10 pour un effet subtil)
      setMousePosition({
        x: x * 0.1,
        y: y * 0.1,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <h1
        ref={titleRef}
        className="hero-title text-[7.5rem] font-black text-center uppercase tracking-wider lg:mt-[-90px] w-full"
      >
        HI, I'M OUSSAMA
      </h1>
      <div className="flex  justify-center w-full">
        <div className="flex lg:justify-between justify-center items-center w-full flex-wrap">
          <div className="max-w-[25%] hidden lg:block">
            {paragraphLines.map((line, index) => (
              <p
                key={index}
                ref={(el) => (paragraphRefs2.current[index] = el)}
                className="mb-2"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="p-10 relative mt-[-60px] lg:ml-[-50px]">
            <div
              ref={containerRef}
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                ref={imageRef}
                alt="Oussama"
                src="/oussama.png"
                width={470}
                height={470}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:items-start items-center w-full lg:w-[25%]">
            <div className="lg:max-w-[25%] w-full block lg:hidden text-center">
              {paragraphLines.map((line, index) => (
                <p
                  key={index}
                  ref={(el) => (paragraphRefs.current[index] = el)}
                  className="mb-2 text-center"
                >
                  {line}
                </p>
              ))}
            </div>
            <button
              ref={buttonRef}
              className="px-8 py-4 rounded-4xl bg-gradient-to-r from-gray-900 via-purple-900 to-pink-600
             text-[20px]   cursor-pointer "
              onMouseEnter={() => {
                gsap.to(buttonRef.current, {
                  rotation: 10,
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={() => {
                gsap.to(buttonRef.current, {
                  rotation: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              CONTACT ME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
