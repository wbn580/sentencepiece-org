import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles');
  const paths = ['/', '/about/', '/concept/', '/math/', '/code/', '/compare/', '/papers/'];
  for (const article of articles) paths.push(`/${article.data.section}/${article.id}/`);
  const urls = paths.map((path) => `  <url><loc>https://sentencepiece.org${path}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
