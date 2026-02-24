"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { experience } from "@/data";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".timeline-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        })
    }, { scope: containerRef });

    return (
        <section id="experience" className="py-24 md:py-32 relative">
            <Container>
                <SectionTitle title="Experience" subtitle="Career Path" />

                <div ref={containerRef} className="space-y-4">
                    {experience.map((job, index) => (
                        <div key={index} className="timeline-item group relative p-8 rounded-3xl hover:bg-secondary-background transition-colors duration-500 border border-transparent hover:border-black/5">
                            <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">
                                <div className="relative">
                                    <span className="text-5xl font-black text-black/5 opacity-50 absolute -top-4 -left-4 -z-10 select-none group-hover:text-accent/20 transition-colors duration-500">
                                        0{index + 1}
                                    </span>
                                    <span className="inline-block px-3 py-1 rounded-full border border-black/10 text-xs font-bold uppercase tracking-wider bg-white">
                                        {job.period}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors duration-300">{job.role}</h3>
                                    <h4 className="text-lg font-medium text-black/60 mb-6">{job.company}</h4>
                                    <p className="text-black/70 leading-relaxed text-lg max-w-2xl">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
