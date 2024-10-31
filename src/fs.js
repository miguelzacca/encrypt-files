import { promises as fs } from 'node:fs'
import path from 'node:path'

export async function searchFiles(target, excludeQueries = []) {
  const files = []

  async function deepSearch(dir) {
    const list = await fs.readdir(dir, { withFileTypes: true })
    for (const file of list) {
      try {
        const fullpath = path.join(dir, file.name)
        if (file.isDirectory()) {
          await deepSearch(fullpath)
          continue
        }
        if (excludeQueries.every((q) => !fullpath.includes(q))) {
          files.push(fullpath)
        }
      } catch (e) {
        continue
      }
    }
  }

  await deepSearch(target)
  return files
}
