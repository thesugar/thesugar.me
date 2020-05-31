import fs from 'fs'

export const writeFileFunc = () => {
    console.log("inside writeFileFunc")
    console.log(process.cwd())
    console.log(__dirname)
    fs.writeFileSync('./datasrc/undefined.json', `{"foo": "hoge", "bar": "fuga"}`)
}