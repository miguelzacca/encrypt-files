import { isUtf8 } from 'node:buffer'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import env from '../env.js'

export function autoKey(key = undefined) {
  return key ? Buffer.from(key, 'hex') : randomBytes(env.KEY_LENGTH)
}

export function encrypt(data, key) {
  const iv = randomBytes(env.IV_LENGTH)
  const cipher = createCipheriv(env.ALGORITHM, key, iv)
  return Buffer.concat([iv, cipher.update(data), cipher.final()])
}

export function decrypt(data, key) {
  const iv = data.subarray(0, env.IV_LENGTH)
  const content = data.subarray(env.IV_LENGTH)
  const decipher = createDecipheriv(env.ALGORITHM, key, iv)
  const decrypted = Buffer.concat([decipher.update(content), decipher.final()])
  return isUtf8(decrypted) ? decrypted.toString() : decrypted
}
