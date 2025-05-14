import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = await getDocBySlug(params.slug);
  if (!doc) {
    return {
      title: 'Documento Não Encontrado',
    };
  }
  return {
    title: doc.frontmatter.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  };
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const doc = await getDocBySlug(params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-lg mx-auto p-6 max-w-4xl">
      <header className="mb-8">
        <Link href="/docs" className="text-blue-600 hover:underline mb-4 block">&larr; Voltar para Documentação</Link>
        <h1 className="text-4xl font-bold text-gray-900">{doc.frontmatter.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        {doc.frontmatter.date && <p className="text-gray-600 text-sm">{doc.frontmatter.date}</p>}
      </header>
      <MDXRemote {...doc.source} />
    </article>
  );
}

