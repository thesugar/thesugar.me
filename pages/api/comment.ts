import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  switch (req.method) {
    case 'POST':
      if (!req.body.postId || !req.body.comment || !req.body.name) {
        res.writeHead(400).end('bad request')
        break
      }

      writeToFile(req.body.postId, req.body.comment, req.body.name)
      res.end()
      break

    case 'GET':
      if (!req.query.id) {
        res.writeHead(400).end('bad request')
        break
      } 

      typeof req.query.id === 'string' ?
      await readFromFiles(req.query.id)
      .then(json => res.json(json))
      .catch(() => res.json({"comments" : {}}))
      : res.writeHead(400).end()
      break

    default:
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
      break
  }
}

const writeToFile = (postId: string, comment: string, name: string) : void => {
  fs.readFile('src/' + postId + '.json', 'utf8', (err, data) => {
    if (err) {
      // 読み込むファイルが存在しない場合にエラーが起こるが、コメントを書き込むタイミングでは少なくとも一度 view されているのでファイルが存在しないことはありえない
      console.log(`File with id ${postId} does not exist.`)
      console.log(err)
      return null
    }

    // ファイルが存在する場合（少なくとも一度は like されている / view されている）
    // 逆に、like か view のどちらかは 0 の可能性あり
    const json = JSON.parse(data || "null")
    const likes = parseInt(json.likes) > 0 ? parseInt(json.likes) : 0
    const views = parseInt(json.views) > 0 ? parseInt(json.views) : 0
    const comments = json.comments ? json.comments : []
    const date = new Date()
    const hour = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString()
    const minute = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
    const now = date.getFullYear() + ' / ' + (date.getMonth()　+　1) + ' / ' + date.getDate() + ' ' + hour + ':' + minute
    const newComments = Object.assign({}, {comment, name, postedAt: now})
    comments.push(newComments)
    fs.writeFile('src/' + postId + '.json', `{"likes": ${likes}, "views": ${views}, "comments": ${JSON.stringify(comments)}}`, () => {
      // do nothing
    })
  })
}

const readFromFiles = async (postId :string) => {
  return await fs.promises.readFile('src/' + postId + '.json', 'utf8')
}