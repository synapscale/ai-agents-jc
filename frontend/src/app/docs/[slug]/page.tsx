import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocData, getAllDocSlugs } from '@/lib/docs';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Interface para os parâmetros da página, para melhor tipagem
interface DocPageProps {
  params: {
    slug: string;
  };
}

// Gera os caminhos estáticos para cada página de documento
export async function generateStaticParams() {
  const paths = getAllDocSlugs(); // Corrigido: usa getAllDocSlugs diretamente
  return paths; // getAllDocSlugs já retorna no formato { params: { slug: '...' } }[]
}

// Gera os metadados para a página (título, etc.)
export async function generateMetadata({ params }: DocPageProps) {
  try {
    const doc = await getDocData(params.slug);
    return {
      title: doc.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    };
  } catch (err) {
    console.error(`Failed to generate metadata for slug: ${params.slug}`, err);
    return {
      title: 'Documento Não Encontrado',
    };
  }
}

// Componente da página do documento
export default async function DocPage({ params }: DocPageProps) {
  const docData = await getDocData(params.slug).catch((err) => {
    console.error(`Failed to get document data for slug: ${params.slug}`, err);
    notFound();
  });

  if (!docData) {
    notFound();
  }

  const doc = docData;

  return (
    <article className="prose prose-invert prose-lg mx-auto p-6 max-w-4xl min-h-screen">
      <header className="mb-8">
        <Link href="/docs" className="text-blue-400 hover:text-blue-300 hover:underline mb-4 block">&larr; Voltar para Documentação</Link>
        <h1 className="text-4xl font-bold text-gray-100 mb-2">{doc.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        {doc.date && <p className="text-gray-400 text-sm">{doc.date}</p>}
      </header>
      <MDXRemote {...doc.mdxSource} />
    </article>
  );
}


