import fs from 'fs'

export const writeFileFunc = () => {
    console.log("inside writeFileFunc")
    fs.writeFileSync('./otameshi.json', `{"foo": "hoge", "bar": "fuga"}`)
}