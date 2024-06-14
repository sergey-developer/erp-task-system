export const isNumberArray = (value: any[]): value is number[] => {
  return Array.isArray(value) && value.every((element) => typeof element === 'number')
}
