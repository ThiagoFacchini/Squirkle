import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-import'
import autoprefixer from 'autoprefixer'

const Config = {
  plugins: [
    postcssImport,
    postcssNesting,
    autoprefixer,
  ],
}

export default Config