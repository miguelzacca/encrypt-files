import { promises as fs } from 'node:fs'
import * as options from './crypto.js'
import env from '../env.js'

export async function processAll(files, option, key) {
  const defOption = options[option]

  await Promise.all(
    files.map(async (file) => {
      try {
        const data = await fs.readFile(file)
        const result = defOption(data, key)
        await fs.writeFile(file, result)

        const newFileName = file.endsWith(env.ENCRYPT_EXT)
          ? file.slice(0, -env.ENCRYPT_EXT.length)
          : file.concat(env.ENCRYPT_EXT)

        await fs.rename(file, newFileName)
      } catch (e) {
        return
      }
    }),
  )
}
