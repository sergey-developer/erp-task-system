import { Table, TableProps } from 'antd'
import React, { FC } from 'react'

import { env } from 'configs/env'

import { TestIdsEnum } from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsTable/constants'

import { getColumns } from './columns'
import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from './types'

const scrollConfig: TableProps<CheckInventorizationEquipmentsTableRow>['scroll'] = { y: 280 }

const CheckInventorizationEquipmentsTable: FC<CheckInventorizationEquipmentsTableProps> = ({
  dataSource,
}) => {
  const columns = getColumns()

  return (
    <div data-testid={TestIdsEnum.Table}>
      <Table<CheckInventorizationEquipmentsTableRow>
        virtual={!env.isTest}
        rowKey='row'
        dataSource={dataSource}
        columns={columns}
        scroll={scrollConfig}
        pagination={false}
      />
    </div>
  )
}

export default CheckInventorizationEquipmentsTable
