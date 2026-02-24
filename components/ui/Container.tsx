import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
    return (
        <section id={id} className={cn("container-custom mx-auto px-6 py-12 md:py-16", className)}>
            {children}
        </section>
    );
}
