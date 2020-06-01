import fs from 'fs'
import path from 'path'

//const jsonDir = path.join(process.cwd(), 'datasrc')

export const writeFileFunc = () => {
    //console.log(fs.readdirSync(jsonDir))
    console.log(require.context(process.cwd(), true, /\.json$/).keys())
    //fs.writeFileSync(path.join(jsonDir, 'undefined.json'), `{"foo": "hoge", "bar": "fuga"}`)
}