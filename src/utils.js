export function progressBar(completed, total) {
  const barLength = Math.min(process.stdout.columns - 10, 100)
  const progress = Math.floor((completed / total) * barLength)
  const bar = `${'█'.repeat(progress)}${' '.repeat(barLength - progress)}`
  const percentage = ((completed / total) * 100).toFixed(2)
  process.stdout.write(`\r[${bar}] ${percentage}%`)
}
