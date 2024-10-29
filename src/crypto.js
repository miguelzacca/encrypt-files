import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

const ALGORITHM = 'aes-256-cbc'

function autoKey(key = undefined) {
  return key ? Buffer.from(key, 'hex') : randomBytes(32)
}

function encrypt(text, key) {
  const iv = randomBytes(16)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([
    iv,
    cipher.update(text, 'utf-8'),
    cipher.final(),
  ])


  return encrypted
}

function decrypt(data, key) {
  const iv = data.slice(0, 16)
  const content = data.slice(16)

  const decipher = createDecipheriv(ALGORITHM, key, iv)

  const decrypted = Buffer.concat([
    decipher.update(content),
    decipher.final(),
  ])

  return decrypted.toString()
}

export { encrypt, decrypt, autoKey }
