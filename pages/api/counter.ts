import { NextApiRequest, NextApiResponse } from 'next'
import { readdirSync } from 'fs'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      //incrementViews(req.body.id)
      res.end()
      break

    case 'GET':
      /* こうすれば読み取り自体はできる
      const test = require('../../test')
      res.json(test)
      res.end()
      */ 

      const fs = require('fs')
      const list_ = fs.readdirSync('./.next/serverless/pages')
      //const list_ = fs.readdirSync('../../datasrc')
      res.json(list_)
      res.end()
      /*
      if (!req.query.id) {
        res.writeHead(400).end('bad request')
        break
      }

      typeof req.query.id === 'string'
        ? await readViews(req.query.id)
            .then((json) => res.json(json))
            .catch(() => res.json({ counts: 0 }))
        : res.writeHead(400).end()
      break

    default:
      res.writeHead(302, {
        Location: '/',
      })
      res.end()
      break
      */
  }
}

/*
const incrementViews = (postId: string): void => {
  fs.readFile('src/' + postId + '.json', 'utf8', (err, data) => {
    if (err) {
      // ファイルが存在しない場合を想定（元々 likes も views も 0）
      fs.writeFile(
        'src/' + postId + '.json',
        `{"likes": ${0}, "views": ${1}}`,
        () => {
          // do nothing
        }
      )
      return null
    }

    // ファイルが存在する場合（少なくとも一度は like されている / view されている）
    // 逆に、like か view のどちらかは 0 の可能性あり
    const json = JSON.parse(data || 'null')
    const likes = parseInt(json.likes) > 0 ? parseInt(json.likes) : 0
    const views = parseInt(json.views) > 0 ? parseInt(json.views) : 0
    const comments = json.comments ? json.comments : []

    fs.writeFile(
      'src/' + postId + '.json',
      `{"likes": ${likes}, "views": ${views + 1}, "comments" : ${JSON.stringify(
        comments
      )}}`,
      () => {
        // do nothing
      }
    )
  })
}

const readViews = async (postId: string) => {
  return await fs.promises.readFile('src/' + postId + '.json', 'utf8')
}
*/
