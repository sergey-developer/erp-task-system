import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { Resizable, ResizableProps } from 'react-resizable'

import { TaskTableItem } from './types'

const ResizeableTitle = (props: ColumnsType<TaskTableItem> & ResizableProps) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  /**
    Предотвращение сортировки после изменения ширины колонки
   */
  const handleOnClickCapture = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (!target.className.includes('ant-table-column-title')) {
      event.stopPropagation()
    }
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} onClickCapture={handleOnClickCapture} />
    </Resizable>
  )
}

export default ResizeableTitle
