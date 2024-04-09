import { Base64Type } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

export const parseBase64 = (base64: Base64Type): MaybeUndefined<string> => {
  try {
    return window.atob(base64)
  } catch (error) {
    console.error('Parse base64 error: ', { base64, error })
  }
}

export const base64ToBytes = (base64: Base64Type): Uint8Array => {
  const binaryString = parseBase64(base64) || ''
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)

  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}
