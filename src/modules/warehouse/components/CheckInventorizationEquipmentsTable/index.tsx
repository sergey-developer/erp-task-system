import { Flex, Table, TableProps } from 'antd'
import React, { FC, useMemo } from 'react'

import { env } from 'configs/env'

import { getColumns } from './columns'
import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from './types'

const scrollConfig: TableProps<CheckInventorizationEquipmentsTableRow>['scroll'] = { y: 280 }

const CheckInventorizationEquipmentsTable: FC<CheckInventorizationEquipmentsTableProps> = ({
  dataSource,
  loading,
  onClickEdit,
  editTouchedRowsIds,
}) => {
  const columns = useMemo(
    () => getColumns({ onClickEdit, editTouchedRowsIds }),
    [editTouchedRowsIds, onClickEdit],
  )

  return (
    <Flex data-testid='check-inventorization-equipments-table'>
      <Table<CheckInventorizationEquipmentsTableRow>
        virtual={!env.isTest}
        rowKey='rowId'
        dataSource={dataSource}
        columns={columns}
        scroll={scrollConfig}
        loading={loading}
        pagination={false}
      />
    </Flex>
  )
}

export default CheckInventorizationEquipmentsTable
