import os from 'node:os'
import { fork } from 'node:child_process'
import { autoKey } from './crypto.js'
import { searchFiles } from './fs.js'
import env from '../env.js'

const [target, option, key] = process.argv.slice(2)

const defTarget = target.replace('~', os.homedir())
const files = await searchFiles(defTarget, env.EXCLUDE_FILE_QUERIES)
const defKey = autoKey(key)

if (option === 'encrypt' && !key) {
  console.log(defKey.toString('hex'))
}

const numCPUs = os.cpus().length
const chunkSize = Math.ceil(files.length / numCPUs)

const fileChunks = []
for (let i = 0; i < files.length; i += chunkSize) {
  fileChunks.push(files.slice(i, i + chunkSize))
}

let completedWorkers = 0

for (const chunk of fileChunks) {
  const worker = fork('src/worker.js')
  worker.send({ files: chunk, option, key: defKey })

  worker.on('exit', () => {
    completedWorkers++
    if (completedWorkers === fileChunks.length) {
      process.exit(0)
    }
  })
}
