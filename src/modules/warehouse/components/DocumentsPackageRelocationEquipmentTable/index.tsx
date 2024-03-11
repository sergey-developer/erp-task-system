import { Table } from 'antd'
import React, { FC, useMemo } from 'react'

import { getColumns } from './columns'
import {
  DocumentsPackageRelocationEquipmentTableItem,
  DocumentsPackageRelocationEquipmentTableProps,
} from './types'

const DocumentsPackageRelocationEquipmentTable: FC<
  DocumentsPackageRelocationEquipmentTableProps
> = ({ onClickTechnicalExamination, ...props }) => {
  const columns = useMemo(
    () => getColumns({ onClickTechnicalExamination }),
    [onClickTechnicalExamination],
  )

  return (
    <div data-testid='documents-package-relocation-equipment-table'>
      <Table<DocumentsPackageRelocationEquipmentTableItem>
        {...props}
        rowKey='id'
        pagination={false}
        columns={columns}
      />
    </div>
  )
}

export default DocumentsPackageRelocationEquipmentTable
