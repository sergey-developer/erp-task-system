import { MimetypeEnum } from 'shared/constants/mimetype'

const isJsonContentType = (type: string): boolean => {
  return type.includes(MimetypeEnum.Json)
}

export default isJsonContentType
