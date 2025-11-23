import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getBlogPostBySlug } from '@/lib/strapi';
import { getStrapiMedia } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, User, Tag } from 'lucide-react';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const { attributes } = post;
  const seo = attributes.seo;

  return {
    title: seo?.metaTitle || attributes.title,
    description: seo?.metaDescription || attributes.excerpt,
    keywords: seo?.keywords,
  };
}

export default async function BlogPostPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { attributes } = post;

  const coverImageUrl = attributes.coverImage.data
    ? getStrapiMedia(attributes.coverImage.data.attributes.url)
    : '/placeholder-blog.jpg';

  return (
    <article className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src={coverImageUrl}
          alt={attributes.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(attributes.publishedAt || attributes.createdAt, locale)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{attributes.readingTime} min de lecture</span>
              </div>
              {attributes.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{attributes.author.name}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {attributes.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-6">
              {attributes.excerpt}
            </p>

            {/* Categories */}
            {attributes.categories?.data && attributes.categories.data.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-neutral-500" />
                {attributes.categories.data.map((category) => (
                  <span
                    key={category.id}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category.attributes.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading
                prose-headings:text-secondary
                prose-p:text-neutral-700
                prose-a:text-primary
                prose-a:no-underline
                hover:prose-a:underline
                prose-img:rounded-lg
                prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
          </div>

          {/* Tags */}
          {attributes.tags && Array.isArray(attributes.tags) && attributes.tags.length > 0 && (
            <div className="bg-neutral-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Tags :</h3>
              <div className="flex flex-wrap gap-2">
                {attributes.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white border border-neutral-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
