import { importAll } from '../components/importAll'

const blogItems = importAll(
    require.context('../pages/articles', true, /\.mdx$/)
)

const tagPostMap = new Map()
blogItems.map(blogItem => {
    blogItem.tags.map(tag => {
        const postListWithSpecificTag = tagPostMap.get(tag) ? tagPostMap.get(tag) : []
        postListWithSpecificTag.push(blogItem)
        tagPostMap.set(tag, postListWithSpecificTag)
    })
})

export const getAllTags = () :string[] => Array.from(tagPostMap.keys())

export const getArticlesWithTagName = (tag: string) => {
    return tagPostMap.get(tag)
}