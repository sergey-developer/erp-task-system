export const checkLastItem = (index: number, arr: any[]): boolean => {
  if (arr.length) {
    return index === arr.length - 1
  }

  console.warn('Passed array is empty')
  return false
}
