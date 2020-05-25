const fs = require('fs')

const id = process.argv[2]
const title = process.argv[3]

if (!id || !title) {
    console.error('😱Either or both of post-id and post-title is empty. \n 💡`node scripts/makeArticle.js {id} {title} {tags}`')
    return null
}

const date = new Date()
const month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
const day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
const hour = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString()
const minute = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
const postedAt = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute

let tags = []
for (let i = 4; i < process.argv.length; i++) {
    tags.push(process.argv[i])
}

fs.readFile('./postlist.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    }

    const posts = JSON.parse(data || "null")
    posts.push({id: id, title: title, tags: tags, postedAt: postedAt})
    fs.writeFileSync('./postlist.json', JSON.stringify(posts))
})

fs.writeFileSync(`./pages/articles/${id}.mdx`, (
    "import Layout from '../../components/Layout'\n" +
    "import Link from 'next/link'\n\n" +
    
    "export const meta = {\n" +
        `\tid: '${id}',\n` +
        `\ttitle: '${title}',\n` +
        `\tdate: '${postedAt}',\n` +
        `\ttags: [${tags.map(tag => `'${tag}'`)}]\n` +
    "}\n\n" +
    
    "export default ({ children }) => <Layout meta={meta}>{children}</Layout>"
))

