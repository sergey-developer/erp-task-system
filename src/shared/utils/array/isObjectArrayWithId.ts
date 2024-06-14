export const isObjectArrayWithId = (value: any): value is { id: number }[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (element) =>
        typeof element === 'object' &&
        element !== null &&
        'id' in element &&
        typeof element.id === 'number',
    )
  )
}
