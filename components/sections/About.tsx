"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { CheckCircle2 } from "lucide-react";
import CoreTech from "./CoreTech";

const highlights = [
    "Full Stack Development",
    "Performance Optimization",
    "Cloud Infrastructure (AWS)",
    "UI/UX Engineering",
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Batch animations for better performance
            ScrollTrigger.batch(".reveal-fade", {
                start: "top 85%",
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        overwrite: true
                    });
                },
                onLeaveBack: (batch) => {
                    // Optional: Reset if you want re-animation, but for performance, better to play once or simple fade out
                    // Keeping simple fade out/reset if requested, but often distinct 'play once' is smoother
                }
            });

            // Set initial state
            gsap.set(".reveal-fade", { opacity: 0, y: 30 });
        },
        { scope: containerRef }
    );

    return (
        <section id="about" className="py-16 md:py-24 bg-secondary-background relative">
            {/* Decorative Grid Line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-black/5" />

            <Container className="py-0">
                <div ref={containerRef}>
                    <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                        <div className="w-full md:w-1/3 md:sticky md:top-32 relative">
                            <SectionTitle title="About Me" subtitle="Who I Am" className="reveal-fade mb-8" />
                            <div className="reveal-fade relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/5 rotate-3 hover:rotate-0 transition-transform duration-500 border border-black/5 will-change-transform max-w-sm mx-auto md:max-w-none">
                                {/* Fallback to original if generated isn't ready, but aiming for profile_clean.png */}
                                <img
                                    src="/images/IMG_3574.jpg"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/IMG_3574.jpg";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="reveal-fade space-y-6 md:space-y-8 text-lg md:text-2xl font-light text-black/80 leading-relaxed mb-12 md:mb-16">
                                <p>
                                    I'm a passionate developer with a keen eye for design. I bridge the gap between <span className="font-semibold text-black">engineering</span> and <span className="font-semibold text-black">creativity</span>, building software that not only works flawlessly but looks stunning.
                                </p>
                                <p className="text-base md:text-lg text-black/60">
                                    With a background in computer science and a love for art, I specialize in creating immersive web experiences that tell a story.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-8 border-t border-black/5 pt-8">
                                    {highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-base font-medium text-black/70">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="reveal-fade rounded-3xl ">
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-40">Tech Stack</h3>
                                <CoreTech />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
