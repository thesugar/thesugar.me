import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default (req: NextApiRequest, res: NextApiResponse) => {

  switch (req.method) {
    case 'POST':
      if (req.body.currentLikedOrNot === "true") { // like 済の場合 -> like を解除する
        changeLikes(req.body.id, 'decrement')
        res.end()
        break
      } else {
        changeLikes(req.body.id, 'increment')
        res.end()
        break
      }

    case 'GET':
      if (!req.query.id) {
        res.writeHead(400).end('bad request')
        break
      } 

      typeof req.query.id === 'string' ?
      readLikes(req.query.id)
      .then(json => res.json(json))
      .catch(() => res.json({"likes" : 0}))
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

const changeLikes = (postId: string, operation: 'increment' | 'decrement') : void => {
  fs.readFile('src/' + postId + '.json', 'utf8', (err, data) => {
    if (err) {
      // 一度も like されておらず、like 数をカウントする JSON ファイルがない場合のエラーを想定
      switch (operation) {
        case 'increment':
          fs.writeFile('src/' + postId + '.json', `{"likes": ${1}}`, () => {
            // do nothing
          })
          break
        case 'decrement':
          // 一度も like していないのに decrement できないから、この処理が走ることはないはず
          fs.writeFile('src/' + postId + '.json', `{"likes": ${0}}`, () => {
            // do nothing
          })
          break
      }
      return null
    }
    const likes = parseInt(JSON.parse(data).likes)
    switch (operation) {
      case 'increment':
        fs.writeFile('src/' + postId + '.json', `{"likes": ${likes+1}}`, () => {
          // do nothing
        })
        break
      case 'decrement':
        fs.writeFile('src/' + postId + '.json', `{"likes": ${likes-1}}`, () => {
          // do nothing
        })
        break
    }
  })
}

const readLikes = (postId :string) => {
  return fs.promises.readFile('src/' + postId + '.json', 'utf8')
}