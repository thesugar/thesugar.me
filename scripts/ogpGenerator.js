const fs = require('fs')
const { createCanvas } = require('canvas')
const base64 = require('urlsafe-base64')
// canvasの横幅
let canvasWidth = 1200
// canvasの縦幅
let canvasHeight = 630
let canvas
let ctx

// タイトル部分の文字スタイル
const titleFontStyle = {
  font:
    "bold 100px -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', HiraginoCustom, 'Hiragino Kaku Gothic ProN', YuGothic, 'Yu Gothic Medium', Meiryo, sans-serif;",
  lineHeight: 120,
  color: '#121B1C',
}
// 本文部分の文字スタイル
const bodyFontStyle = {
  font:
    'bold 80px Palatino, "Hiragino Mincho ProN", "ヒラギノ明朝 Pro W6", "Hiragino Mincho Pro", HGS明朝E, "Yu Mincho", YuMincho, "ＭＳ Ｐ明朝", serif',
  lineHeight: 80,
  color: '#03A9F4',
}
// 画像内側余白
let padding = 80

// 背景色
// let backgroundColor = "#122022";

const generate = (title, body, fileName) => {
  body = 'THESUGAR.ME'
  // 空白のcanvasを作成
  canvas = createCanvas(canvasWidth, canvasHeight)
  // コンテキスト取得
  ctx = canvas.getContext('2d')
  // -----
  // タイトル描画
  // -----
  // 行長さ
  let lineWidth = canvasWidth - padding * 2
  // フォント設定
  ctx.font = titleFontStyle.font
  // 行数の割り出し
  let titleLines = splitByMeasureWidth(title, lineWidth, ctx)
  let titleLineCnt = titleLines.length
  // タイトル分の高さ
  let titleHeight = titleLines.length * titleFontStyle.lineHeight

  // -----
  // 本文部分描画
  // -----
  let titleMargin = 40
  // フォント設定
  ctx.font = bodyFontStyle.font
  // 行数の割り出し
  let bodyLines = splitByMeasureWidth(body, lineWidth, ctx)
  let bodyLineCnt = bodyLines.length

  // 本文分の高さ
  let bodyHeight = bodyLines.length * bodyFontStyle.lineHeight

  // 行高さと余白が最小高さ(630)を上回る場合はカンバスをリサイズする
  let contentHeight = titleHeight + titleMargin + bodyHeight + padding * 2
  if (canvasHeight < contentHeight) {
    canvasHeight = contentHeight
    canvas = createCanvas(canvasWidth, contentHeight)
    ctx = canvas.getContext('2d')
  }

  // 取り敢えず背景色をつける
  let gradient = ctx.createLinearGradient(100, 0, canvas.width - 100, 0)
  gradient.addColorStop(0, 'white')
  gradient.addColorStop(1, '#6190E8')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  // 文字描画のベースラインを設定
  ctx.textBaseline = 'top'
  // タイトルを描画
  ctx.fillStyle = titleFontStyle.color
  ctx.font = titleFontStyle.font
  for (let index = 0; index < titleLineCnt; index++) {
    const element = titleLines[index]
    ctx.fillText(element, padding, padding + titleFontStyle.lineHeight * index)
  }
  // 本文を描画
  ctx.fillStyle = bodyFontStyle.color
  ctx.font = bodyFontStyle.font
  for (let index = 0; index < bodyLineCnt; index++) {
    const element = bodyLines[index]
    // タイトル分の高さと余白を加算する
    // ctx.fillText で文字を書く
    ctx.fillText(
      element,
      canvasWidth - 'THESUGARME'.length * bodyFontStyle.lineHeight + 20,
      canvasHeight - bodyFontStyle.lineHeight - padding
    )
    // ctx.strokeText で文字を縁取り
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#fff'
    ctx.strokeText(
      element,
      canvasWidth - 'THESUGARME'.length * bodyFontStyle.lineHeight + 20,
      canvasHeight - bodyFontStyle.lineHeight - padding
    )
  }

  let b64 = canvas.toDataURL().split(',')
  let img = base64.decode(b64[1])
  // ファイル保存
  fs.writeFile(fileName, img, function (err) {
    console.log(err)
  })
}

const splitByMeasureWidth = (str, maxWidth, context) => {
  // サロゲートペアを考慮した文字分割
  let chars = Array.from(str)
  let line = ''
  let lines = []
  for (let index = 0; index < chars.length; index++) {
    if (maxWidth <= context.measureText(line + chars[index]).width) {
      lines.push(line)
      line = chars[index]
    } else {
      line += chars[index]
    }
  }
  lines.push(line)
  return lines
}

// 投稿一覧を取得
const allPosts = require('../postlist.json')

// OGP 画像が入っているディレクトリ内のファイル名（=すでに生成済みの OGP 画像の）一覧を取得
const fileNames = fs.readdirSync('./public/ogp', 'utf8')

// 投稿一覧と生成済み OGP 画像一覧を比較して、未生成の記事に対応する OGP 画像のみ生成
allPosts
  .filter((post) => !fileNames.includes(post.id + '.jpg'))
  .map((post) => {
    generate(post.title, post.postedAt, './public/ogp/' + post.id + '.jpg')
  })
