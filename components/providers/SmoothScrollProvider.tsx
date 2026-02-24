"use client";

import { ReactNode, useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({
    children,
}: SmoothScrollProviderProps) {
    useLayoutEffect(() => {
        // Check for prefers-reduced-motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
            return;
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Integrate ScrollTrigger proxy
        // Although Lenis typically handles window scroll, using proxy ensures precise sync
        // for scroll-driven animations as requested.
        ScrollTrigger.scrollerProxy(window, {
            scrollTop(value) {
                if (arguments.length) {
                    lenis.scrollTo(value as number);
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        // Set defaults
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            // Clear ScrollTrigger listeners if necessary, though usually handled by GSAP context
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return <>{children}</>;
}
