export function downloadTextFile(fileName, lines) {
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadCsv(fileName, headers, rows) {
  const lines = [headers.join(',')]
  rows.forEach((row) => {
    lines.push(headers.map((key) => `"${String(row[key] == null ? '' : row[key]).replace(/"/g, '""')}"`).join(','))
  })
  downloadTextFile(fileName, lines)
}
