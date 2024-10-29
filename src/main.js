import fs from 'node:fs'
import * as options from './crypto.js'

function isHex(str) {
  return typeof str === 'string' && str.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(str)
}

function processAll(files, option, key) {
  const defOption = options[option]

  for (const file of files) {
    const data = fs.readFileSync(file, 'utf-8')

    const parsedData = data.split(':')
    const dataIsHex = isHex(parsedData[0])

    const defData = dataIsHex ? parsedData : [data]
    const result = defOption(defData, key)

    fs.writeFileSync(file, result)
  }
}

export { processAll }