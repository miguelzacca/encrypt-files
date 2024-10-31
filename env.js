export default {
  ALGORITHM: 'aes-256-cbc',
  KEY_LENGTH: 32,
  IV_LENGTH: 16,
  ENCRYPT_EXT: '.bin',
  EXCLUDE_FILE_QUERIES: [
    'encrypt-files',
    'node_modules',
    '.git',
    '.next',
    '.ini',
  ],
}
