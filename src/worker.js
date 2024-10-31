import { promises as fs } from 'node:fs'
import * as options from './crypto.js'
import env from '../env.js'

process.on('message', async ({ files, option, key }) => {
  const bufferKey = Buffer.from(key)
  const defOption = options[option]

  await Promise.all(
    files.map(async (file) => {
      try {
        const data = await fs.readFile(file)
        const result = defOption(data, bufferKey)
        await fs.writeFile(file, result)

        const newFileName =
          option === 'encrypt'
            ? file.concat(env.ENCRYPT_EXT)
            : file.slice(0, -env.ENCRYPT_EXT.length)

        await fs.rename(file, newFileName)
      } catch (e) {
        return
      }
    }),
  )

  process.exit(0)
})
