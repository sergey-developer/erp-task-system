import { useSize } from 'ahooks'
import { RefObject, useRef } from 'react'

export type UsePrivateHeaderHeightResult = {
  ref: RefObject<HTMLElement>
  height?: number
}

export const usePrivateHeaderHeight = (): UsePrivateHeaderHeightResult => {
  const ref = useRef<HTMLElement>(null)
  const size = useSize(ref)
  return { ref, height: size ? size.height : undefined }
}
