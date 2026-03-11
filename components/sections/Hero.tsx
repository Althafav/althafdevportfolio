"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ParticleMesh from "@/components/ui/ParticleMesh";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-text-element", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            })
                .from(".hero-visual", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.2,
                }, "-=0.8");
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
            <ParticleMesh />

            <div className="container-custom mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div ref={textRef} className="order-2 md:order-1 relative">
                    {/* Architectural Watermark */}
                    <span className="absolute -top-20 -left-20 text-[10rem] md:text-[12rem] font-black text-black/3 pointer-events-none select-none leading-none z-0">
                        PORT
                        <br />
                        FOLIO
                    </span>

                    <div className="relative z-10">
                        <span className="hero-text-element inline-block py-1 px-3 border border-black/10 rounded-full bg-white/50 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            Est. {new Date().getFullYear()}
                        </span>
                        <h1 className="hero-text-element text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8 mix-blend-multiply">
                            CRAFTING <br />
                            <span className="text-outline-premium text-transparent bg-clip-text bg-linear-to-b from-black to-black/60">
                                DIGITAL
                            </span> <br />
                            EXPERIENCES
                        </h1>
                        <p className="hero-text-element text-lg md:text-xl text-black/70 max-w-lg mb-10 font-medium leading-relaxed">
                            Web Developer & UI/UX Designer building pixel-perfect, interactive, and accessible websites.
                        </p>
                        <div className="hero-text-element flex flex-wrap gap-4">
                            <Link href="#projects">
                                <Button className="shadow-xl shadow-accent/20">
                                    View Projects
                                </Button>
                            </Link>
                            <Link href="#contact">
                                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white hover:text-black">
                                    Contact Me
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hero-visual order-1 md:order-2 flex justify-center items-center relative">
                    <div className="relative w-64 h-64 md:w-120 md:h-120">
                        {/* Circle decorative elements */}
                        <div className="absolute inset-0 border border-black/5 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 border border-black/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
