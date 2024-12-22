import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),  // Add Tailwind CSS
        autoprefixer(), // Add Autoprefixer
      ],
    },
  },
};
