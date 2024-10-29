import fs from 'node:fs'
import * as options from './crypto.js'

function processAll(files, option, key) {
  const defOption = options[option]

  for (const file of files) {
    const data = fs.readFileSync(file)
    const result = defOption(data, key)
    fs.writeFileSync(file, result)

    if (file.includes('.bin')) {
      fs.renameSync(file, file.replace('.bin', ''))
      continue
    }

    fs.renameSync(file, `${file}.bin`)
  }
}

export { processAll }