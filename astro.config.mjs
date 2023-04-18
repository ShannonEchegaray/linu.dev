import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import fs from 'node:fs'

// https://astro.build/config
export default defineConfig({
	site: 'https://linu.dev',
	integrations: [tailwind(), mdx()],
	markdown: {
		shikiConfig: {
			theme: 'dracula',
			// Agrega lenguajes de programación personalizados
			// Nota: Shiki tiene innumerables lenguajes de programación incorporados, ¡incluido .astro!
			// https://github.com/shikijs/shiki/blob/main/docs/languages.md
			langs: [],
			wrap: true,
		},
	},
	vite: {
		ssr: {
			noExternal: ['smartypants'],
		},
		plugins: [rawFonts(['.ttf', '.woff'])],
		optimizeDeps: {
			exclude: ['@resvg/resvg-js'],
		},
	},
})

// vite plugin to import fonts
function rawFonts(ext) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id)
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				}
			}
		},
	}
}
