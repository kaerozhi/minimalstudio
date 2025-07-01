import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({  
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain name here
  integrations: [ sitemap()],  
  image: {
    domains: ["media.kaerozhi.com"],
  }
});