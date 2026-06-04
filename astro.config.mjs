import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tolgahancepel.github.io',
  base: '/hormesis-dataeng',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
  },
});
