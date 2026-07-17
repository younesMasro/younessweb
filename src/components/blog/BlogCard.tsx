import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PostSummary } from "@/lib/blog";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="secondary" className="w-fit">
          {post.category}
        </Badge>
        <h3 className="text-balance text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>&bull;</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTimeMinutes} min de lecture
          </span>
        </div>
      </div>
    </Link>
  );
}
