import { fork } from 'node:child_process'
import env from '../env.js'

let totalFiles = 0
let count = 0
let startTime = Date.now()

export async function createWorker(files, option, key) {
  return new Promise((res, rej) => {
    const worker = fork('./src/worker.js')
    worker.send({ files, option, key })

    worker.on('message', () => {
      const progress = ((count / totalFiles) * 100).toFixed(2)
      const time = ((Date.now() - startTime) / 1000).toFixed(2)
      process.stdout.write(`\r${count++}/${totalFiles} ${progress}% | ${time}s`)
    })

    worker.on('error', rej)
    worker.on('exit', res)
  })
}

export async function processWorkers(files, option, key) {
  totalFiles = files.length
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
