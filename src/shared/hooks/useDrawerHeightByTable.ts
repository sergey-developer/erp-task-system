import { useSize } from 'ahooks'
import { RefObject, useRef } from 'react'

import { FOOTER_HEIGHT, LAYOUT_CONTENT_PADDING_V } from 'shared/constants/common'

export type UseDrawerHeightByTableResult = {
  tableRef: RefObject<HTMLDivElement>
  drawerHeight?: number
}

export const useDrawerHeightByTable = (): UseDrawerHeightByTableResult => {
  const tableRef = useRef<HTMLDivElement>(null)
  const tableSize = useSize(tableRef)

  return {
    tableRef,
    drawerHeight: tableSize
      ? tableSize.height + LAYOUT_CONTENT_PADDING_V + FOOTER_HEIGHT
      : undefined,
  }
}
