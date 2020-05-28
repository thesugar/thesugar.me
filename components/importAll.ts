type PostData = {
  id: string
  title: string
  date: string
  tags: Array<string>
} & {
  name: string
}

export const importAll = (r: __WebpackModuleApi.RequireContext): PostData[] => {
  const posts: PostData[] = []

  r.keys().map((key) => {
    const meta = r(key).meta ?? {}
    posts.push({
      name: key.replace(/\.mdx$/, ''),
      ...meta,
    })
    posts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  })

  return posts
}
