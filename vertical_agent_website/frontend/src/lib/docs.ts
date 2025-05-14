import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export function getSortedDocsData() {
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { title: string; date: string }),
    };
  });
  return allDocsData.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else {
      return 1;
    }
  });
}

export async function getDocData(id: string): Promise<{
  id: string;
  mdxSource: MDXRemoteSerializeResult;
  [key: string]: any;
}> {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const mdxSource = await serialize(matterResult.content);
  return {
    id,
    mdxSource,
    ...matterResult.data,
  };
}

export function getAllDocIds() {
  const fileNames = fs.readdirSync(docsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

