import os from 'node:os'

export default {
  ALGORITHM: 'aes-256-ctr',
  KEY_LENGTH: 32,
  IV_LENGTH: 16,
  ENCRYPT_EXT: '.bin',
  WORKERS_SIZE: os.cpus().length,
  EXCLUDE_FILE_QUERIES: [
    'encrypt-files',
    'node_modules',
    '.git',
    '.next',
    '.ini',
  ],
}
