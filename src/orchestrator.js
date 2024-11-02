import { fork } from 'node:child_process'
import { progressBar } from './utils.js'
import env from '../env.js'

let totalFiles = 0
let count = 0

export async function createWorker(files, option, key) {
  return new Promise((res, rej) => {
    const worker = fork('./src/worker.js')
    worker.send({ files, option, key })

    worker.on('message', () => {
      progressBar(count++, totalFiles)
    })

    worker.on('error', rej)
    worker.on('exit', res)
  })
}

export async function processWorkers(files, option, key) {
  totalFiles = files.length
  const chunkSize = Math.ceil(files.length / env.WORKERS_SIZE)

  console.log(`[LOG] ${chunkSize} files per worker`)

  const fileChunks = []
  for (let i = 0; i < files.length; i += chunkSize) {
    fileChunks.push(files.slice(i, i + chunkSize))
  }

  const promises = fileChunks.map((chunk) => {
    return createWorker(chunk, option, key)
  })

  console.log(`\n[LOG] ${env.WORKERS_SIZE} workers created\n`)

  return Promise.all(promises)
}
