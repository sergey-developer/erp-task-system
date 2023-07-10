export const clickDownloadLink = (
  data: BlobPart,
  type: string,
  filename?: string,
): void => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.download = filename || 'download'
  link.href = url
  link.click()

  window.URL.revokeObjectURL(link.href)
}
