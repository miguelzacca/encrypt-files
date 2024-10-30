import { isUtf8 } from 'node:buffer'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

const ALGORITHM = 'aes-256-cbc'
const KEY_LENGTH = 32
const IV_LENGTH = 16

function autoKey(key = undefined) {
  return key ? Buffer.from(key, 'hex') : randomBytes(KEY_LENGTH)
}

function encrypt(data, key) {
  const iv = randomBytes(IV_LENGTH)

  const cipher = createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()])

  return encrypted
}

function decrypt(data, key) {
  const iv = data.subarray(0, IV_LENGTH)
  const content = data.subarray(IV_LENGTH)

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  const decrypted = Buffer.concat([decipher.update(content), decipher.final()])

  return isUtf8(decrypted) ? decrypted.toString() : decrypted
}

export { encrypt, decrypt, autoKey }
