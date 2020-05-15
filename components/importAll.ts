export const importAll = (r: __WebpackModuleApi.RequireContext) => {

    type PostData = { 
        title: string
        date : string
        tags : Array<string>    
    } & {
        name: string
    }

    const posts: PostData[] = []

    r.keys().map((key) => {
        const meta = r(key).meta ?? {}
        posts.push({
          name: key.replace(/\.mdx$/, ''),
          ...meta,
        })
    })

    return posts
}