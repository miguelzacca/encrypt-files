import os from 'node:os'
import { autoKey } from './encryption.js'
import { searchFiles } from './files.js'
import { processWorkers } from './orchestrator.js'
import env from '../env.js'

const [target, option, key] = process.argv.slice(2)

const defKey = autoKey(key)
const defTarget = target.replace('~', os.homedir())

const files = await searchFiles(defTarget, env.EXCLUDE_FILE_QUERIES)

console.log(`[LOG] ${files.length} files found\n`)

if (option === 'encrypt' && !key) {
  console.warn(`[KEY] ${defKey.toString('hex')}\n`)
}

const startTime = Date.now()

await processWorkers(files, option, defKey)

const totalTime = ((Date.now() - startTime) / 1000).toFixed(2)
console.log(`\n\n[LOG] finished in ${totalTime}s\n`)
