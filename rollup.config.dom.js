import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'export.dom.ts',
	output: {
		sourcemap: !production,
        format: 'iife',
        name: 'app',
        // We output it to public. This way, our svelte kit
        // app will also host the web components.
        file: 'public/alert-this.dom.js',
	},
    // Normal rollup svelte configuration. Nothing fancy
    // happening here.
    plugins: [
        typescript(),
        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
                postcss: true
            }),
            // We just make sure that no global CSS is injeced
            // into the page that imports this script.
            emitCss: false,
            compilerOptions: {
                dev: !production
            }
        }),
        resolve(),
        commonjs(),
        // Minify the production build (npm run build)
        production && terser()
    ]
}