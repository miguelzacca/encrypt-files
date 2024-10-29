# encrypt-files

Command-line based program to encrypt files. Encryption algorithm: AES-256-GCM

## API

- `npm start <path> <option> <key>`

**Path:**

The target directory for encryption/decryption

**Option:**

- `encrypt`
- `decrypt`

If the option is encrypt, the key is optional, in which case it will be generated automatically and returned to the terminal

**Key:**

Your custom key, or the encryption key in case of decryption

## Example

**Encrypt:**

```bash
npm start ~/Desktop encrypt
```

Output (auto-key):

```txt
bfaa6d2fb79d9c0dfd153f2baf1e2538baa4997b3b98c010c252d5dee6adbbd0
```

**Decrypt:**

```bash
npm start ~/Desktop decrypt bfaa6d2fb79d9c0dfd153f2baf1e2538baa4997b3b98c010c252d5dee6adbbd0
```
