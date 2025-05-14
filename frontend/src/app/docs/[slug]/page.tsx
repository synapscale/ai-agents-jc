import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocData, getAllDocIds } from '@/lib/docs'; // Corrigido: getDocData e getAllDocIds
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
  const paths = getAllDocIds(); // Corrigido: usa getAllDocIds diretamente
  return paths; // getAllDocIds já retorna no formato { params: { slug: '...' } }[]
}

// Gera os metadados para a página (título, etc.)
export async function generateMetadata({ params }: DocPageProps) {
  try {
    const doc = await getDocData(params.slug); // Corrigido: usa getDocData
    return {
      title: doc.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      // Você pode adicionar mais metadados aqui, como description, se estiverem no frontmatter
      // description: doc.description,
    };
  } catch (error) {
    // Se o documento não for encontrado por getDocData, ele lançará um erro (fs.readFileSync)
    // Ou podemos verificar se doc é nulo se getDocData retornasse null em caso de erro, mas ele não faz isso.
    return {
      title: 'Documento Não Encontrado',
    };
  }
}

// Componente da página do documento
export default async function DocPage({ params }: DocPageProps) {
  let doc;
  try {
    doc = await getDocData(params.slug); // Corrigido: usa getDocData
  } catch (error) {
    // Se getDocData falhar (ex: arquivo não encontrado), o erro será capturado aqui.
    // notFound() irá renderizar a página 404 mais próxima.
    notFound();
  }

  // Se, por algum motivo, doc não for definido mesmo sem erro (improvável com a lógica atual de getDocData)
  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-invert prose-lg mx-auto p-6 max-w-4xl min-h-screen">
      <header className="mb-8">
        <Link href="/docs" className="text-blue-400 hover:text-blue-300 hover:underline mb-4 block">&larr; Voltar para Documentação</Link>
        <h1 className="text-4xl font-bold text-gray-100 mb-2">{doc.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        {doc.date && <p className="text-gray-400 text-sm">{doc.date}</p>}
      </header>
      {/* @ts-expect-error Server Component */} 
      <MDXRemote source={doc.mdxSource} /> {/* Corrigido: usa doc.mdxSource e a prop é 'source' para MDXRemote v5+ */}
    </article>
  );
}


