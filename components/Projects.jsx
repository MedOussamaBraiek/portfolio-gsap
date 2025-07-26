"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const jocker_project = {
    id: "1",
    title: "Jocker Shop",
    description: "E-commerce store with product customization using NextJS.",
    info1:
      "Developed web platform back end using Node js, front end using ReactJs, defined and maintained databases to deliver responsiveness to data client requests.",
    info2:
      "Integrated enhancements into web design to improve user stickiness, smooth functionality, and boost load times.",
    info3:
      "Translated UX and business requirements into elegant code solutions.",
    url: "https://jocker-shop.vercel.app",
    cover: "/projects/jocker_cover.PNG",
    technologies: ["Next.js", "Prisma"],
  };

  const hablar_project = {
    id: "2",
    title: "Hablar",
    description:
      "A Chat App where you can send messages on real time and images and online status.",
    info1: "MERN stack Chat Application with Socket.IO",
    info2: "Send and delete messages on Real Time and see Online Status",
    url: "https://hablar.onrender.com",
    cover: "/projects/hablar_cover.PNG",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Zustand"],
  };

  const dashboard_project = {
    id: "3",
    title: "Responsive Dashboard App",
    description:
      "A responsive Dashboard App that could work as a desktop or mobile App.",
    info1: "Firebase Authentication Google Auth",
    info2: "Charts Navigation Dark / Light Mode",
    info3: "Implemented drag-and-drop functionality with smooth animations.",
    cover: "/projects/dashboard_flutter_cover.png",
    technologies: ["Flutter", "Firebase"],
  };

  const clinic_project = {
    id: "4",
    title: "Clinic-DR-Karim",
    description:
      "A clinic website for managing appointments and viewing a calendar for patient scheduling.",
    info1: "Patients can book appointments and view a calendar online.",
    info3: "MongoDB used for managing patient and appointment data.",
    url: "https://docteur-karim-somai.vercel.app/",
    cover: "/projects/karim_cover.png",
    technologies: ["React.js", "Node.js", "MongoDB", "Redux"],
  };

  const universe_project = {
    id: "5",
    title: "MI-UNIVERSE",
    description:
      "An e-commerce store, an online classroom, and a streaming webapp (01/2022 - 06/2022)",
    info1:
      "Developed web platform back end using Node js, front end using ReactJs, defined and maintained databases to deliver responsiveness to data client requests.",
    info2:
      "Expanded development efforts to include related platforms and protocols such as REST and database technologies like MongoDB.",
    url: "https://mi-universe.vercel.app/",
    cover: "/projects/universe_cover.png",
    technologies: ["React.js", "Node.js", "MongoDB", "Redux"],
  };

  const paper_project = {
    id: "6",
    title: "Paper Portfolio",
    description:
      "A portfolio designed like a newspaper. It was a challenge I set for myself to complete in 2 days over a weekend. The design was inspired by an award-winning website.",
    info1: "Designed like a newspaper with responsive layout",
    info2: "Built in 2 days as a weekend challenge",
    url: "https://oussama-braiek.vercel.app/",
    cover: "/projects/paper_cover.png",
    technologies: ["React.js", "Tailwind CSS"],
  };

  const projects = [
    jocker_project,
    hablar_project,
    dashboard_project,
    clinic_project,
    universe_project,
    paper_project,
  ];

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray(".project-card");

      if (cards.length === 0) return;

      // Set initial states
      gsap.set(".img-wrapper img", {
        clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)",
        autoAlpha: 0,
      });

      gsap.set(".card-content h1, .card-content p", {
        y: 50,
        autoAlpha: 0,
      });

      // Animate each card
      cards.forEach((card, index) => {
        const img = card.querySelector(".img-wrapper img");
        const content = card.querySelectorAll(
          ".card-content h3, .card-content p"
        );

        // Image reveal animation
        gsap.to(img, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Content reveal animation
        gsap.to(content, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Card stacking animation
        gsap.to(card, {
          scale: 0.9 + 0.05 * index, // Progressive scaling
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top ${5 + 5 * index}%`,
            end: "bottom bottom",
            endTrigger: ".container",
            scrub: 1,
            pin: card,
            pinSpacing: false,
            invalidateOnRefresh: true,
            id: `card-${index}`,
          },
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const ProjectCard = ({ project }) => {
    return (
      <div className="project-card bg-black border border-gray-400  min-h-[65vh] flex rounded-[40px] mb-[75vh] shadow-2xl overflow-hidden">
        <div className="card-content h-full w-[50%] flex flex-col justify-center p-10 items-center space-y-6">
          <h3 className="text-3xl font-bold text-white text-center">
            {project.title}
          </h3>
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            {project.description}
          </p>
          <div className="space-y-3 text-gray-600 text-sm">
            <p>{project.info1}</p>
            <p>{project.info2}</p>
            <p>{project.info3}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              View Project
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
        <div className="img-wrapper h-full w-[50%] relative overflow-hidden">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full block object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      className="lg:pt-24 md:pt-[300px] sm:pt-[300px] pt-[150px] overflow-hidden"
    >
      <div className="text-center mb-20">
        <h2 className="sm:text-7xl text-[3rem] font-bold text-white mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text">
          Projects
        </h2>
        <p className="text-white/60 text-lg">Web & Mobile</p>
      </div>

      <div id="smooth-wrapper" className="overflow-hidden h-full">
        <div id="smooth-content">
          <div className="spacer w-full min-h-[100vh]"></div>

          <div className="container w-full min-h-[100vh] flex flex-col items-center">
            <div className="stacked-cards flex flex-col items-center w-[100%] lg:w-[70%]">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div className="spacer w-full min-h-[100vh]"></div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
