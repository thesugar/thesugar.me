import fs from 'fs'
import path from 'path'

export const writeFileFunc = () => {
    console.log("inside writeFileFunc")
    console.log(process.cwd()) // `var/task`
    console.log(__dirname) // `/`
    fs.writeFileSync(path.join(process.cwd(), '.next','serverless','pages'), `{"foo": "hoge", "bar": "fuga"}`)
}