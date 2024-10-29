import os from 'node:os'
import { processAll } from './main.js'
import { autoKey } from './crypto.js'
import { searchFiles } from './fs.js'
import env from '../env.js'

const [target, option, key] = process.argv.slice(2)

const defTarget = target.replace('~', os.homedir())
const files = searchFiles(defTarget, env.excludeFileQueries)
const defKey = autoKey(key)

if (option === 'encrypt' && !key) {
  console.log(defKey.toString('hex'))
}

processAll(files, option, defKey)
