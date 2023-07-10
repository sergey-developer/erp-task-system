import { MaybeUndefined } from 'shared/interfaces/utils'

export const base64ToArrayBuffer = (
  base64: string,
): MaybeUndefined<Uint8Array> => {
  try {
    const binaryString = window.atob(base64)
    const binaryLen = binaryString.length
    const bytes = new Uint8Array(binaryLen)

    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return bytes
  } catch (error) {
    console.error('Parse base64 error: ', { base64, error })
  }
}
