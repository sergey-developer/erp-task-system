import { MaybeUndefined } from 'shared/types/utils'

export const parseBase64 = (base64: string): MaybeUndefined<string> => {
  try {
    return window.atob(base64)
  } catch (error) {
    console.error('Parse base64 error: ', { base64, error })
  }
}

export const base64ToArrayBuffer = (base64: string): Uint8Array => {
  const binaryString = parseBase64(base64) || ''
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)

  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}
