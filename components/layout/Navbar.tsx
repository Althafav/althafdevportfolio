"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Exp.", href: "#experience" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navRef = useRef<HTMLUListElement>(null);

    const updateIndicator = () => {
        if (activeSection && navRef.current) {
            const activeLink = navRef.current.querySelector(
                `a[href="${activeSection}"]`
            ) as HTMLElement;

            if (activeLink) {
                // Calculate position relative to the UL
                const navRect = navRef.current.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();

                setIndicatorStyle({
                    left: linkRect.left - navRect.left,
                    width: linkRect.width,
                    opacity: 1,
                });
            }
        } else {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    };

    useEffect(() => {
        // Basic GSAP ScrollTrigger to update active state
        const triggers: ScrollTrigger[] = [];

        navItems.forEach((item) => {
            const section = document.querySelector(item.href);
            if (section) {
                triggers.push(
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => setActiveSection(item.href),
                        onEnterBack: () => setActiveSection(item.href),
                    })
                );
            }
        });

        return () => {
            triggers.forEach((t) => t.kill());
        };
    }, []);

    // Update indicator when active section changes or window resizes
    useEffect(() => {
        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [activeSection]);

    // Initial check for hash on load
    useEffect(() => {
        if (window.location.hash) {
            setActiveSection(window.location.hash);
        }
    }, []);

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-white/70 backdrop-blur-md border border-white/20 ring-1 ring-black/5 rounded-full px-1.5 py-1.5 pointer-events-auto shadow-sm transition-all duration-300 hover:shadow-md">
                <ul ref={navRef} className="flex items-center relative">
                    {/* Active Sliding Pill */}
                    <li
                        className="absolute top-0 bottom-0 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] z-0"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity,
                        }}
                    />

                    {navItems.map((item) => (
                        <li key={item.name} className="relative z-10">
                            <Link
                                href={item.href}
                                onClick={() => setActiveSection(item.href)}
                                className={cn(
                                    "block px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 select-none",
                                    activeSection === item.href
                                        ? "text-white"
                                        : "text-black/60 hover:text-black"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
