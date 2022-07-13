import { useBoolean } from 'ahooks'
import { useCallback } from 'react'

type CopyFunction = (value: string) => Promise<void>

type UseClipboardReturnType = {
  copy: CopyFunction
  copied: boolean
}

const useClipboard = (): UseClipboardReturnType => {
  const [copied, { setTrue, setFalse }] = useBoolean(false)

  const copy: CopyFunction = useCallback(
    async (value) => {
      try {
        await navigator.clipboard.writeText(value)
        setTrue()
      } catch {
        setFalse()
      }
    },
    [setFalse, setTrue],
  )

  return {
    copy,
    copied,
  }
}

export default useClipboard
