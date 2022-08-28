import { build } from "esbuild"
import esBuildDevServer from "esbuild-dev-server"

// Dirty hack to load cjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ESBuild Plugins
import copyFilePlugin from 'esbuild-copy-files-plugin'
import svgPlugin from 'esbuild-plugin-svgr'
import stylePlugin from 'esbuild-style-plugin'

// PostCSS Plugins
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'


esBuildDevServer.start(
    build({
        entryPoints: ['./index.tsx'],
        bundle: true,
        minify: false,
        sourcemap: true,
        incremental: true,
        // format: 'esm',
        platform: 'browser',
        target: ['chrome58', 'safari11'],
        loader: { 
            '.png': "dataurl", 
            '.hdr': 'dataurl', 
            '.jpg': 'dataurl',
            '.otf': 'dataurl',
            '.ttf': 'dataurl'
        },
        plugins: [
            stylePlugin({
                postcss: {
                    plugins: [
                        postcssImport,
                        postcssNesting,
                        autoprefixer                        
                    ]
                }
            }),
            copyFilePlugin({
                source: ['../../public/client/reset.css'],
                target: ['../../public/client/dist'],
                copyWithFolder: false
            }),
            svgPlugin()
        ],
        outdir: '../../public/client/dist'
        // external: ["three/examples/jsm/controls/OrbitControls"]
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