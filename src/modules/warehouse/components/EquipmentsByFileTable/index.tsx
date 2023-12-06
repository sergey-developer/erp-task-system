import { Table, TableProps, Tooltip, Typography } from 'antd'
import isNumber from 'lodash/isNumber'
import { GetComponentProps } from 'rc-table/lib/interface'
import React, { FC } from 'react'

import { columns } from './columns'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

const { Text } = Typography

const scrollConfig: TableProps<EquipmentByFileTableRow>['scroll'] = { y: 280 }

const customComponents: TableProps<EquipmentByFileTableRow>['components'] = {
  body: {
    row: ({
      missRequiredFields,
      ...props
    }: ReturnType<GetComponentProps<EquipmentByFileTableRow>> & {
      missRequiredFields: boolean
    }) => {
      const row = <tr {...props} />

      return missRequiredFields ? (
        <Tooltip
          title={<Text type='danger'>Не заполнены обязательные поля или данные не корректны</Text>}
        >
          {row}
        </Tooltip>
      ) : (
        row
      )
    },
  },
}

const EquipmentsByFileTable: FC<EquipmentsByFileTableProps> = ({ errors, ...props }) => {
  return (
    <Table<EquipmentByFileTableRow>
      {...props}
      data-testid='equipments-by-file-table'
      rowKey='rowId'
      columns={columns}
      scroll={scrollConfig}
      pagination={false}
      components={customComponents}
      /* https://github.com/ant-design/ant-design/issues/28817 */
      onRow={(data, index) =>
        errors && isNumber(index)
          ? ({ missRequiredFields: !!errors[index] } as ReturnType<
              GetComponentProps<EquipmentByFileTableRow>
            >)
          : {}
      }
    />
  )
}

export default EquipmentsByFileTable
