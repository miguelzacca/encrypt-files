import fs from 'node:fs'
import * as options from './crypto.js'

const ENCRYPT_EXT = '.bin'

function processAll(files, option, key) {
  const defOption = options[option]

  for (const file of files) {
    const data = fs.readFileSync(file)
    const result = defOption(data, key)
    fs.writeFileSync(file, result)

    if (file.endsWith(ENCRYPT_EXT)) {
      fs.renameSync(file, file.slice(0, -ENCRYPT_EXT.length))
      continue
    }

    fs.renameSync(file, file.concat(ENCRYPT_EXT))
  }
}

export { processAll }
