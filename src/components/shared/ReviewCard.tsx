import Image from "next/image";
import { Quote } from "lucide-react";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glow-border glass group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.16_220/0.35)]">
      <div
        aria-hidden
        className="glass absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full text-primary"
      >
        <Quote className="size-3.5 fill-current" />
      </div>
      <div className="relative w-full overflow-hidden">
        <Image
          src={review.image}
          alt={review.alt}
          width={640}
          height={480}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
