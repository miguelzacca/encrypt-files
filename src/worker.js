import { promises as fs } from 'node:fs'
import * as options from './encryption.js'
import env from '../env.js'

process.on('message', async ({ files, option, key }) => {
  const defOption = options[option]

  async function mainProcess(file) {
    try {
      const data = await fs.readFile(file)
      const result = defOption(data, Buffer.from(key))
      await fs.writeFile(file, result)

      const newFileName =
        option === 'encrypt'
          ? file.concat(env.ENCRYPT_EXT)
          : file.slice(0, -env.ENCRYPT_EXT.length)

      await fs.rename(file, newFileName)
      process.send(1)
    } catch (e) {
      return
    }
  }

  for (let i = 0; i < files.length; i += env.PROMISE_CHUNK_SIZE) {
    const chunk = files.slice(i, i + env.PROMISE_CHUNK_SIZE).map(mainProcess)
    await Promise.all(chunk)
  }

  process.exit(0)
})
