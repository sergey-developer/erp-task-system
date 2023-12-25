/*
 * Создана по причине того что одна из библиотек тестового окружения конвертирует hex в rgb
 * */
export const hexToRGB = (hexCode: string): { r: number; g: number; b: number } => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}
