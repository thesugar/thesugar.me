const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

const withMDX = require("@next/mdx")({
    extension: /\.(md|mdx)?$/,
    options: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    }
  });
  
const nextConfig = {
    pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
}
  
module.exports = withMDX(nextConfig);