const esbuild = require('esbuild')

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: 'node',
    plugins: [
        nodeExternalsPlugin()
    ]
}).catch(() => process.exit(1))