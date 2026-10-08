import { getCollection } from 'astro:content';

export async function GET() {
  const postsFr = await getCollection('blog');
  const postsEn = await getCollection('blog_en');

  const staticPages = [
    '',
    '/en/',
    '/blog',
    '/en/blog',
  ];

  const blogFrUrls = postsFr.map(post => ({
    url: `/blog/${post.slug}/`,
    date: post.data.date,
  }));

  const blogEnUrls = postsEn.map(post => ({
    url: `/en/blog/${post.slug}/`,
    date: post.data.date,
  }));

  const today = new Date().toISOString().split('T')[0];
  const urls = [
    ...staticPages.map(p => ({ url: p, date: today })),
    ...blogFrUrls,
    ...blogEnUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, date }) => `  <url>
    <loc>https://blog.grow-lot.com${url === '' ? '/' : url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' || url === '/en/' ? '1.0' : (url.startsWith('/blog') || url.startsWith('/en/blog/')) && url.split('/').length > 3 ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
