import fs from 'node:fs'
import path from 'node:path'

function searchFiles(target, excludeQueries = []) {
  const files = []

  function deepSearch(dir) {
    const list = fs.readdirSync(dir)

    for (const file of list) {
      try {
        const fullpath = path.join(dir, file)
        const stats = fs.statSync(fullpath)

        if (stats.isDirectory()) {
          deepSearch(fullpath)
          continue
        }

        const isValidFile = excludeQueries.every((q) => !fullpath.includes(q))
        if (isValidFile) {
          files.push(fullpath)
        }
      } catch (e) {
        continue
      }
    }
  }

  deepSearch(target)
  return files
}

export { searchFiles }
