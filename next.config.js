const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism],
  },
})

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}

module.exports = withMDX(nextConfig)
