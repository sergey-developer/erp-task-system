export const prettyBytes = (bytes: number, decimal = 1): string => {
  const baseBytes = 1024
  const kiloBytes = baseBytes
  const megaBytes = baseBytes * baseBytes
  const gigaBytes = baseBytes * baseBytes * baseBytes

  if (bytes < kiloBytes) {
    return `${bytes ? bytes : 0.1} Байт`
  } else if (bytes < megaBytes) {
    return (bytes / kiloBytes).toFixed(decimal) + ' Кб'
  } else if (bytes < gigaBytes) {
    return (bytes / megaBytes).toFixed(decimal) + ' Мб'
  } else {
    return (bytes / gigaBytes).toFixed(decimal) + ' Гб'
  }
}
