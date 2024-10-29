import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

function autoKey(key = undefined) {
  return key ? Buffer.from(key, 'hex') : randomBytes(32)
}

function encrypt([text], key) {
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-gcm', key, iv)

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf-8'),
    cipher.final(),
  ])

  const authTag = cipher.getAuthTag()

  return [
    iv.toString('hex'),
    encrypted.toString('hex'),
    authTag.toString('hex'),
  ].join(':')
}

function decrypt([iv, content, tag], key) {
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))

  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final(),
  ])

  return decrypted.toString()
}

export { encrypt, decrypt, autoKey }
