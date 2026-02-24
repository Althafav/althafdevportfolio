"use client";

import { useRef, ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils"; // We need to create this util

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "outline" | "ghost";
    className?: string;
    magnetic?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    className,
    magnetic = true,
    ...props
}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(
        () => {
            if (!magnetic || !buttonRef.current) return;

            const button = buttonRef.current;

            const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = button.getBoundingClientRect();

                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);

                xTo(x * 0.3); // Magnetic strength
                yTo(y * 0.3);
            };

            const handleMouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            button.addEventListener("mousemove", handleMouseMove);
            button.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                button.removeEventListener("mousemove", handleMouseMove);
                button.removeEventListener("mouseleave", handleMouseLeave);
            };
        },
        { scope: buttonRef }
    );

    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";

    const variants = {
        primary: "bg-foreground text-background hover:bg-black/90", // Black button, white text
        outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-accent/10",
    };

    return (
        <button
            ref={buttonRef}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {/* Optional: Add hover fill effect element here if needed */}
        </button>
    );
}
