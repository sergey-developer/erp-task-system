import { Flex, Table } from 'antd'
import React, { FC, useMemo } from 'react'

import { getColumns } from './columns'
import {
  DocumentsPackageRelocationEquipmentTableItem,
  DocumentsPackageRelocationEquipmentTableProps,
} from './types'

const DocumentsPackageRelocationEquipmentTable: FC<
  DocumentsPackageRelocationEquipmentTableProps
> = ({ onClickTechnicalExamination, disabled, ...props }) => {
  const columns = useMemo(
    () => getColumns({ onClickTechnicalExamination, disabled }),
    [disabled, onClickTechnicalExamination],
  )

  return (
    <Flex data-testid='documents-package-relocation-equipment-table'>
      <Table<DocumentsPackageRelocationEquipmentTableItem>
        {...props}
        rowKey='id'
        pagination={false}
        columns={columns}
      />
    </Flex>
  )
}

export default DocumentsPackageRelocationEquipmentTable
