const isJsonContentType = (type: string): boolean => {
  return type.includes('application/json')
}

export default isJsonContentType
