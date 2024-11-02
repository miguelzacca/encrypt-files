export function progressBar(completed, total) {
  function createBar(progress, barLength) {
    return `${'█'.repeat(progress)}${' '.repeat(barLength - progress)}`
  }

  const barLength = Math.min(process.stdout.columns - 10, 100)
  let progress = Math.floor((completed / total) * barLength)

  process.stdout.write(
    `\r[${createBar(progress, barLength)}] ${completed}/${total}`,
  )

  if (completed + 1 === total) {
    process.stdout.write(
      `\r[${createBar(barLength, barLength)}] ${total}/${total}`,
    )
  }
}
