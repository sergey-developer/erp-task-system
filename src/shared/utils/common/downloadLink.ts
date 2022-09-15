export const makeDownloadLink = (
  data: string,
  type: string,
  filename?: string,
): HTMLAnchorElement => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.download = filename || 'download'
  link.href = url

  return link
}

export const clickDownloadLink = (link: HTMLAnchorElement) => {
  link.click()
  window.URL.revokeObjectURL(link.href)
}
