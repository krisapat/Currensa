import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

export default function FeatureCard({ title, description, link }: FeatureCardProps) {
  return (
    <div className="relative min-h-[250px] md:min-h-[300px] bg-white/60 dark:bg-white/10 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl mb-2 text-center font-semibold">
        {title}
      </h2>
      <p className="text-lg mb-2 text-center">{description}</p>
      <Button asChild className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <Link href={link}>View features</Link>
      </Button>
    </div>
  );
}
