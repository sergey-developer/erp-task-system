import { Button, Table, TableProps } from 'antd'
import React, { FC } from 'react'

import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'
import { RelocationCompletionDocumentModel } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

export type DocumentsPackageRelocationEquipmentTableProps = Pick<TableProps, 'dataSource'>

const DocumentsPackageRelocationEquipmentTable: FC<
  DocumentsPackageRelocationEquipmentTableProps
> = (props) => {
  return (
    <div data-testid='documents-package-relocation-equipment-table'>
      <Table
        {...props}
        rowKey='id'
        pagination={false}
        columns={[
          {
            dataIndex: 'equipment',
            title: 'Наименование',
            render: (
              value: ArrayFirst<
                RelocationCompletionDocumentModel['relocationEquipments']
              >['equipment'],
            ) => value.title,
          },
          {
            dataIndex: 'equipment',
            title: 'Серийный номер',
            render: (
              value: ArrayFirst<
                RelocationCompletionDocumentModel['relocationEquipments']
              >['equipment'],
            ) => value.serialNumber,
          },
          {
            dataIndex: 'condition',
            title: 'Состояние',
            render: (
              value: ArrayFirst<
                RelocationCompletionDocumentModel['relocationEquipments']
              >['condition'],
            ) => equipmentConditionDict[value],
          },
          {
            key: 'ateData',
            dataIndex: 'condition',
            width: 150,
            render: (
              value: ArrayFirst<
                RelocationCompletionDocumentModel['relocationEquipments']
              >['condition'],
            ) => (
              <Button
                disabled={
                  value !== EquipmentConditionEnum.Broken &&
                  value !== EquipmentConditionEnum.NonRepairable
                }
              >
                Данные АТЭ
              </Button>
            ),
          },
        ]}
      />
    </div>
  )
}

export default DocumentsPackageRelocationEquipmentTable
