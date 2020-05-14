const withMDX = require("@next/mdx")({
    extension: /\.(md|mdx)?$/,
  });
  
const nextConfig = {
    pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
}
  
module.exports = withMDX(nextConfig);