const postsDir = __dirname + '/pages/articles'

export const allRequire = (context: __WebpackModuleApi.RequireContext) => {
    context.keys().forEach(context)
}

export const r = require.context(postsDir, true, /\.mdx$/)