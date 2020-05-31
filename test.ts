import fs from 'fs'

export const writeFileFunc = () => {
    console.log("inside writeFileFunc")
    fs.writeFileSync('./datasrc/undefined.json', `{"foo": "hoge", "bar": "fuga"}`)
}