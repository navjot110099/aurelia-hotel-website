import type { Metadata } from "next";
import Image from "@/components/ui/SmartImage";
import { notFound } from "next/navigation";
import { JOURNAL } from "@/lib/site";
import { AnimatedChars } from "@/components/ui/AnimatedText";
import { ARTICLES } from "./articles";
import { ArticleBody } from "./ArticleBody";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return JOURNAL.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Essay Not Found" };
  }
  return {
    title: `${post.title} · The Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = JOURNAL.find((p) => p.slug === slug);
  const article = ARTICLES[slug];

  if (!post || !article) {
    notFound();
  }

  const related = JOURNAL.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Cinematic article hero */}
      <section className="relative flex h-[80vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 md:px-10 md:pb-24">
          <p className="eyebrow mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            {post.category}
          </p>
          <h1 className="font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-sand md:text-6xl">
            <AnimatedChars text={post.title} delay={0.3} />
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-sand/70">
            <span>{article.author}</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>{post.readingTime} read</span>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gold/70">
            {article.authorTitle}
          </p>
        </div>
      </section>

      <div className="bg-ink">
        <ArticleBody blocks={article.blocks} related={related} />
      </div>
    </>
  );
}
