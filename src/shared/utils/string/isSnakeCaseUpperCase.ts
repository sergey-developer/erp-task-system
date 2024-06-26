export const isSnakeCaseUpperCase = (key: string): boolean => {
  const pattern = /^[A-Z0-9_]+$/
  return pattern.test(key)
}
