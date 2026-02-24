import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
    return (
        <div className={cn("mb-12 md:mb-20", className)}>
            {subtitle && (
                <span className="block text-accent text-sm font-bold uppercase tracking-widest mb-4">
                    {subtitle}
                </span>
            )}
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                {title}
            </h2>
        </div>
    );
}
