"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { techStack } from "@/data";
// import Image from "next/image"; // Can use standard img for external simple-icons to avoid config hassle, or Image with unoptimized

export default function CoreTech() {
    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);

    return (
        <div className="py-10 overflow-hidden" id="tech-carousel">
            <div className="embla" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_10rem] min-w-0 px-4"
                        >
                            <div className="h-24 bg-white border border-black/10 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm hover:border-accent hover:shadow-md transition-all duration-300 group cursor-grab active:cursor-grabbing">
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="font-bold text-sm">{tech.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
