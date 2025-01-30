import { Space, Table, TableProps, Tooltip, Typography } from 'antd'
import { GetComponentProps } from 'rc-table/lib/interface'
import React, { FC, useMemo } from 'react'

import { env } from 'configs/env'

import { ValidationErrors } from 'shared/api/services/baseApi'

import { getColumns } from './columns'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

const { Text } = Typography

const scrollConfig: TableProps<EquipmentByFileTableRow>['scroll'] = { y: 280 }

const components: TableProps<EquipmentByFileTableRow>['components'] = {
  body: {
    cell: ({
      errors,
      ...props
    }: ReturnType<GetComponentProps<EquipmentByFileTableRow>> & { errors?: ValidationErrors }) => {
      const cell = <th {...props} />

      return errors ? (
        <Tooltip
          title={
            <Space direction='vertical'>
              {errors.map((error) => (
                <Text type='danger'>{error}</Text>
              ))}
            </Space>
          }
        >
          {cell}
        </Tooltip>
      ) : (
        cell
      )
    },
  },
}

const EquipmentsByFileTable: FC<EquipmentsByFileTableProps> = ({ errors, onEdit, dataSource }) => {
  const columns = useMemo(
    () => getColumns({ onEdit, dataSource, errors }),
    [dataSource, errors, onEdit],
  )

  return (
    <Table<EquipmentByFileTableRow>
      data-testid='equipments-by-file-table'
      virtual={!env.isTest}
      rowKey='rowId'
      dataSource={dataSource}
      columns={columns}
      scroll={scrollConfig}
      pagination={false}
      components={components}
    />
  )
}

export default EquipmentsByFileTable
