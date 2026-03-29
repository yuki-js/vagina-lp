// Vite's import.meta.glob for automatic discovery of .md files
const markdownFiles = import.meta.glob('../../docs/content/*.md', { 
  as: 'raw', 
  eager: true 
});

export interface DocMetadata {
  slug: string;
  title: string;
  content: string;
}

export const DOCS_REGISTRY: Record<string, DocMetadata> = {};

// Process the discovered files
Object.entries(markdownFiles).forEach(([path, content]) => {
  // Extract slug from filename (e.g., ../../docs/content/introduction.md -> introduction)
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  
  // Extract title (simple approach: first # header or capitalize slug)
  const titleMatch = (content as string).match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  DOCS_REGISTRY[slug] = {
    slug,
    title,
    content: content as string
  };
});

export const ALL_DOCS = Object.values(DOCS_REGISTRY);

/**
 * Get doc by slug
 */
export function getDocBySlug(slug: string): DocMetadata | undefined {
  return DOCS_REGISTRY[slug];
}
