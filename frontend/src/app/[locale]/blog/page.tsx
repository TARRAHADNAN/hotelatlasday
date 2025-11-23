import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/strapi';
import BlogCard from '@/components/cards/BlogCard';
import { BlogPost } from '@/types/blog';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function BlogPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Fetch blog posts from Strapi
  let posts: BlogPost[] = [];
  try {
    const data = await getBlogPosts(locale);
    posts = data.posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('page_title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-100">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">
                Aucun article disponible pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
