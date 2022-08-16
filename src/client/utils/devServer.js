const {build} = require("esbuild")
const esBuildDevServer = require("esbuild-dev-server")
const cssModulesPlugin = require("esbuild-css-modules-plugin")
const postCssPlugin = require("esbuild-plugin-postcss")
const postCssConfig = require("./postcss.config")

esBuildDevServer.start(
    build({
        entryPoints: ['./index.tsx'],
        bundle: true,
        minify: false,
        sourcemap: true,
        incremental: true,
        metafile: true,
        format: 'esm',
        target: ['chrome58', 'safari11'],
        outdir: '../../public/client/dist',
        plugins: [
            cssModulesPlugin(),
            postCssPlugin.default(postCssConfig)
        ]
    }),
    // To run the dev server a permission change is necessary:
    // chmod u+x node_modules/esbuild-dev-server-darwin-x64/devserver
    {
        port: '8080',
        watchDir: './',
        index: '../../public/client/index.html',
        staticDir: '../../public/client/',
        onBeforeRebuild: {},
        onAfterRebuild: {}
    }
)