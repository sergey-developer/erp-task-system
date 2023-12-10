import { Table, TableProps, Tooltip, Typography } from 'antd'
import isNumber from 'lodash/isNumber'
import { GetComponentProps } from 'rc-table/lib/interface'
import React, { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

const { Text } = Typography

const scrollConfig: TableProps<EquipmentByFileTableRow>['scroll'] = { y: 280 }

const customComponents: TableProps<EquipmentByFileTableRow>['components'] = {
  body: {
    row: ({
      hasErrors,
      ...props
    }: ReturnType<GetComponentProps<EquipmentByFileTableRow>> & { hasErrors: boolean }) => {
      const row = <tr {...props} />

      return hasErrors ? (
        <Tooltip
          title={<Text type='danger'>Не заполнены обязательные поля или данные не корректны</Text>}
          placement='topRight'
        >
          {row}
        </Tooltip>
      ) : (
        row
      )
    },
  },
}

const EquipmentsByFileTable: FC<EquipmentsByFileTableProps> = ({ errors, onEdit, dataSource }) => {
  const columns = useMemo(() => getColumns({ onEdit, dataSource }), [dataSource, onEdit])

  return (
    <Table<EquipmentByFileTableRow>
      data-testid='equipments-by-file-table'
      rowKey='rowId'
      dataSource={dataSource}
      columns={columns}
      scroll={scrollConfig}
      pagination={false}
      components={customComponents}
      /* https://github.com/ant-design/ant-design/issues/28817 */
      onRow={(data, index) =>
        errors && isNumber(index)
          ? ({ hasErrors: !!errors[index] } as ReturnType<
              GetComponentProps<EquipmentByFileTableRow>
            >)
          : {}
      }
    />
  )
}

export default EquipmentsByFileTable
