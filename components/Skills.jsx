"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const topRowRef = useRef(null);
  const middleRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const sectionRef = useRef(null);

  const allLogos = [
    { src: "/logos/nextjs.png", alt: "Next", title: "Next.js" },
    { src: "/logos/nodejs.png", alt: "Node", title: "Node.js" },
    { src: "/logos/reactjs.png", alt: "React", title: "React.js" },
    { src: "/logos/angular.png", alt: "Angular", title: "Angular.js" },
    { src: "/logos/flutter.png", alt: "Flutter", title: "Flutter" },
    { src: "/logos/kotlin.png", alt: "Kotlin", title: "Kotlin" },
    { src: "/logos/springboot.png", alt: "Spring", title: "Spring Boot" },
    { src: "/logos/mongodb.png", alt: "Mongo", title: "MongoDB" },
    { src: "/logos/redux.png", alt: "Redux", title: "Redux" },
    { src: "/logos/zustand.png", alt: "Zustand", title: "Zustand" },
    { src: "/logos/express.png", alt: "Express", title: "Express" },
    { src: "/logos/prisma.png", alt: "Prisma", title: "Prisma" },
    { src: "/logos/figma.png", alt: "Figma", title: "Figma" },
    { src: "/logos/tailwind.png", alt: "Tailwind", title: "Tailwind" },
    { src: "/logos/bootstrap.png", alt: "Bootstrap", title: "Bootstrap" },
    { src: "/logos/blender.png", alt: "Blender", title: "Blender" },
    { src: "/logos/js.png", alt: "JavaScript", title: "JavaScript" },
    { src: "/logos/java.png", alt: "Java", title: "Java" },
    { src: "/logos/python.png", alt: "Python", title: "Python" },
    { src: "/logos/dart.png", alt: "Dart", title: "Dart" },
    { src: "/logos/c.png", alt: "C#", title: "C#" },
    { src: "/logos/firebase.png", alt: "Firebase", title: "Firebase" },
  ];

  // Diviser les logos en trois rangées
  const topRowLogos = allLogos.slice(0, 8);
  const middleRowLogos = allLogos.slice(8, 15);
  const bottomRowLogos = allLogos.slice(15);

  useEffect(() => {
    // Créer des animations infinies pour chaque rangée
    const createInfiniteScroll = (element, direction, duration) => {
      const width = element.scrollWidth / 2; // Moitié de la largeur car on duplique

      gsap.set(element, { x: direction === "left" ? 0 : -width });

      return gsap.to(element, {
        x: direction === "left" ? -width : 0,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    };

    // Animation d'entrée de la section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Attendre que les éléments soient montés
    setTimeout(() => {
      if (topRowRef.current) {
        createInfiniteScroll(topRowRef.current, "left", 20);
      }
      if (middleRowRef.current) {
        createInfiniteScroll(middleRowRef.current, "right", 25);
      }
      if (bottomRowRef.current) {
        createInfiniteScroll(bottomRowRef.current, "left", 30);
      }
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const SkillItem = ({ logo, index }) => (
    <div key={index} className="flex-shrink-0 mx-8">
      <div
        className="flex items-center flex-col group cursor-pointer"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget.querySelector(".skill-card"), {
            duration: 0.3,
            ease: "back.out(1.7)",
          });
          gsap.to(e.currentTarget.querySelector(".skill-title"), {
            y: -5,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget.querySelector(".skill-card"), {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(e.currentTarget.querySelector(".skill-title"), {
            y: 0,
            color: "rgba(255, 255, 255, 0.7)",
            duration: 0.3,
            ease: "power2.out",
          });
        }}
      >
        <div className="skill-card relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-6 border border-white/20 transition-all duration-300 hover:border-white/40">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={logo.src}
            alt={logo.alt}
            width="60"
            height="60"
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
        <h3 className="skill-title mt-4 text-sm font-medium text-white/70 transition-all duration-300">
          {logo.title}
        </h3>
      </div>
    </div>
  );

  const SkillRow = ({ logos, direction }) => (
    <div className="flex items-center whitespace-nowrap ">
      {/* Première série de logos */}
      {logos.map((logo, index) => (
        <SkillItem key={`${direction}-${index}`} logo={logo} index={index} />
      ))}
      {/* Duplication pour l'effet infini */}
      {logos.map((logo, index) => (
        <SkillItem
          key={`${direction}-duplicate-${index}`}
          logo={logo}
          index={index}
        />
      ))}
    </div>
  );

  return (
    <div ref={sectionRef} className="py-24 overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text">
          My Skills
        </h2>
        <p className="text-white/60 text-lg">Technologies I work with</p>
      </div>

      <div className="space-y-12">
        {/* Top Row - Moves Left */}
        <div className="overflow-hidden">
          <div ref={topRowRef} className="flex">
            <SkillRow logos={topRowLogos} direction="top" />
          </div>
        </div>

        {/* Middle Row - Moves Right */}
        <div className="overflow-hidden">
          <div ref={middleRowRef} className="flex">
            <SkillRow logos={middleRowLogos} direction="middle" />
          </div>
        </div>

        {/* Bottom Row - Moves Left */}
        <div className="overflow-hidden">
          <div ref={bottomRowRef} className="flex">
            <SkillRow logos={bottomRowLogos} direction="bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
