/*
import fs from 'fs'
import path from 'path'

//const jsonDir = path.join(process.cwd(), 'datasrc')

export const writeFileFunc = () => {
    //console.log(fs.readdirSync(jsonDir))
    console.log(require.context(__dirname, true, /\.json$/).keys())
    //fs.writeFileSync(path.join(jsonDir, 'undefined.json'), `{"foo": "hoge", "bar": "fuga"}`)
}
*/

import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
    // /posts 配下のファイル名を取得する
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // id として使うためにファイル名から .md を削除する
        const id = fileName.replace(/\.md$/, '')
        
        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // データを id と合わせる
        return {
            id,
            fileContents
        }
    })
}

export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => {
        return { 
            params : {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    return {
        id,
        fileContents
    }
}