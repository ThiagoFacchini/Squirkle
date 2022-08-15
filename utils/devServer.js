const {build} = require("esbuild")
const esBuildDevServer = require("esbuild-dev-server")
const cssModulesPlugin = require("esbuild-css-modules-plugin")
const postCssPlugin = require("esbuild-plugin-postcss")
const postCssConfig = require("./postcss.config")

esBuildDevServer.start(
    build({
        entryPoints: ['./src/index.tsx'],
        bundle: true,
        minify: false,
        sourcemap: true,
        incremental: true,
        metafile: true,
        format: 'esm',
        target: ['chrome58', 'safari11'],
        outdir: './public/dist',
        plugins: [
            cssModulesPlugin(),
            postCssPlugin.default(postCssConfig)
        ]
    }),
    {
        port: '8080',
        watchDir: './src/',
        index: 'public/index.html',
        staticDir: 'public/',
        onBeforeRebuild: {},
        onAfterRebuild: {}
    }
)