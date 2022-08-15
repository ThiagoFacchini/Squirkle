require('esbuild').buildSync({
    entryPoints: ['./src/app.tsx'],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: ['chrome58', 'safari11'],
    outdir: './public/dist'
})