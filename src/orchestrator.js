import { fork } from 'node:child_process'
import env from '../env.js'

export async function createWorker(files, option, key) {
  return new Promise((res, rej) => {
    const worker = fork('./src/worker.js')
    worker.send({ files, option, key })
    worker.on('error', rej)
    worker.on('exit', res)
  })
}

export async function processWorkers(files, option, key) {
  const chunkSize = Math.ceil(files.length / env.WORKERS_SIZE)

  const fileChunks = []
  for (let i = 0; i < files.length; i += chunkSize) {
    fileChunks.push(files.slice(i, i + chunkSize))
  }

  const promises = fileChunks.map((chunk) => {
    return createWorker(chunk, option, key)
  })

  return Promise.all(promises)
}
