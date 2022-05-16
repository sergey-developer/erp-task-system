import useComponentSize from '@rehooks/component-size'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import React, {
  FC,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { TABLE_COLUMNS_ETC, TABLE_COLUMNS_SHORT } from './constants'

type TaskTableProps = Pick<TableProps<any>, 'dataSource' | 'loading'> & {
  columns: 'all' | 'shorts'
  heightContainer: number
}

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  columns,
  heightContainer,
}) => {
  const columnsData = useMemo(() => {
    switch (columns) {
      case 'all':
        return TABLE_COLUMNS_SHORT.concat(TABLE_COLUMNS_ETC)
      case 'shorts':
        return TABLE_COLUMNS_SHORT
      default:
        return TABLE_COLUMNS_SHORT
    }
  }, [columns])
  const refTable = useRef(null)
  const [scrollY, setScrollY] = useState<number>()
  useEffect(() => {
    const { offsetHeight: tableBodyHeight } = (
      refTable?.current as unknown as HTMLDivElement
    )?.querySelector('.ant-table-tbody') as HTMLDivElement
    const { offsetHeight: tableHeadHeight } = (
      refTable?.current as unknown as HTMLDivElement
    )?.querySelector('.ant-table-thead') as HTMLDivElement
    if (tableBodyHeight + tableHeadHeight > heightContainer) {
      setScrollY(heightContainer - tableHeadHeight)
    } else {
      setScrollY(0)
    }
  }, [heightContainer])
  return (
    <Table
      ref={refTable}
      dataSource={dataSource}
      columns={columnsData}
      pagination={false}
      rowKey={'task'}
      loading={loading}
      scroll={scrollY ? { y: scrollY } : undefined}
    />
  )
}

export default TaskTable
