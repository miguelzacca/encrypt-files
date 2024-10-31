import os from 'node:os'
import { autoKey } from './encyption.js'
import { searchFiles } from './files.js'
import { processWorkers } from './orchestrator.js'
import env from '../env.js'

const [target, option, key] = process.argv.slice(2)

const defKey = autoKey(key)
const defTarget = target.replace('~', os.homedir())

const files = await searchFiles(defTarget, env.EXCLUDE_FILE_QUERIES)

if (option === 'encrypt' && !key) {
  console.log(defKey.toString('hex'))
}

await processWorkers(files, option, defKey)
