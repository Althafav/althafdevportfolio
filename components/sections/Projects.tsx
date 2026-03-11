"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { projects } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 3D Tilt Effect
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        cards.forEach((card) => {
            const content = card.querySelector(".project-content");
            const image = card.querySelector(".project-image");

            card.addEventListener("mousemove", (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d" // Important for 3d effect
                });

                // Parallax image
                /*
                gsap.to(image, {
                    x: (x - centerX) * 0.05,
                    y: (y - centerY) * 0.05,
                    duration: 0.5,
                });
                */
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
                /*
                gsap.to(image, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                });
                */
            });
        });

    }, { scope: containerRef });

    return (
        <Container id="projects">
            <div ref={containerRef}>
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20">
                    <SectionTitle title="Selected Work" subtitle="Portfolio" className="mb-0" />

                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
                        >
                            <div className={`project-card relative rounded-3xl overflow-hidden shadow-2xl shadow-black/5 border border-black/5 aspect-4/3 ${index % 2 === 1 ? 'md:col-start-2' : ''}`} style={{ transformStyle: "preserve-3d" }}>
                                <div className="absolute inset-0 bg-secondary-background flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                                    {/* Placeholder or Image */}
                                    <span className="text-9xl font-black text-black/3 select-none">{index + 1}</span>
                                </div>
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
                            </div>

                            <div className={`${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                                    {project.category}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-black/70 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                                <ul className="flex gap-4 mb-10">
                                    {project.tags.map(tag => (
                                        <li key={tag} className="text-sm font-medium text-black/40">#{tag}</li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-4">
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                        <Button magnetic className="group-hover:bg-accent group-hover:text-black hover:bg-accent! hover:text-black!">
                                            Visit Website <ArrowUpRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-32 text-center md:hidden">
                    <Link href="#projects">
                        <Button variant="outline">
                            View All Projects
                        </Button>
                    </Link>
                </div> */}
            </div>
        </Container>
    );
}
