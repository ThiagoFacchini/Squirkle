import { build } from "esbuild"
import esBuildDevServer from "esbuild-dev-server"
import cssModulesPlugin from "esbuild-css-modules-plugin"

import postCssPlugin from "esbuild-plugin-postcss"
import copyFilePlugin from 'esbuild-copy-files-plugin'
import svgPlugin from 'esbuild-plugin-svgr'

import postCssConfig from "./postcssConfig.mjs"

esBuildDevServer.start(
    build({
        entryPoints: ['./index.tsx'],
        bundle: true,
        minify: false,
        sourcemap: true,
        incremental: true,
        metafile: true,
        format: 'esm',
        loader: { '.png' : "dataurl" },
        target: ['chrome58', 'safari11'],
        outdir: '../../public/client/dist',
        plugins: [
            cssModulesPlugin(),
            postCssPlugin.default(postCssConfig),
            copyFilePlugin({
                source: ['../../public/client/reset.css'],
                target: ['../../public/client/dist'],
                copyWithFolder: false
            }),
            svgPlugin()
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