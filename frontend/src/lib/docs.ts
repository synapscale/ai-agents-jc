import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// Define o caminho para o diretório onde seus arquivos .md da documentação estão.
// Certifique-se de que a pasta 'content/docs' existe na raiz do seu projeto Next.js (ou seja, 'frontend/content/docs')
const docsDirectory = path.join(process.cwd(), 'content/docs');

// Interface para o frontmatter dos seus documentos Markdown
// Adicione ou remova campos conforme necessário e defina se são opcionais
interface DocFrontmatter {
  title?: string;
  date?: string;
  // Exemplo de outro campo que você pode ter:
  // description?: string;
  [key: string]: unknown; // Permite outras chaves, usando 'unknown' que é mais seguro que 'any'
}

export function getSortedDocsData(): ({ id: string } & DocFrontmatter)[] {
  // Lê todos os nomes de arquivo no diretório de documentos
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames.map((fileName) => {
    // Remove ".md" do nome do arquivo para obter o id (slug)
    const id = fileName.replace(/\.md$/, '');

    // Lê o arquivo markdown como string
    const fullPath = path.join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Usa gray-matter para parsear a seção de metadados (frontmatter)
    const matterResult = matter(fileContents);

    // Combina os dados com o id, fazendo um type assertion para DocFrontmatter
    return {
      id,
      ...(matterResult.data as DocFrontmatter),
    };
  });

  // Ordena os posts por id (ou outro critério, como título ou data se disponível e consistente)
  return allDocsData.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else {
      return 1;
    }
    // Exemplo de ordenação por data (descomente e ajuste se 'date' for um campo obrigatório e formatado):
    // if (a.date && b.date) {
    //   if (a.date < b.date) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    // }
    // return 0;
  });
}

export async function getDocData(id: string): Promise<{
  id: string;
  mdxSource: MDXRemoteSerializeResult;
} & DocFrontmatter> {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Usa gray-matter para parsear o frontmatter e o conteúdo
  const matterResult = matter(fileContents);

  // Usa next-mdx-remote para serializar o conteúdo MDX
  const mdxSource = await serialize(matterResult.content);

  // Retorna os dados e o mdxSource, fazendo um type assertion para DocFrontmatter
  return {
    id,
    mdxSource,
    ...(matterResult.data as DocFrontmatter),
  };
}

export function getAllDocIds(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(docsDirectory);

  // Retorna uma lista de objetos no formato esperado por getStaticPaths
  // Cada objeto deve ter a chave `params` e dentro dela um objeto com a chave `slug`
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}


