import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import {
  DocumentsPackageRelocationEquipmentTableItem,
  DocumentsPackageRelocationEquipmentTableProps,
} from './types'

export const getColumns = ({
  onClickTechnicalExamination,
}: Pick<
  DocumentsPackageRelocationEquipmentTableProps,
  'onClickTechnicalExamination'
>): ColumnsType<DocumentsPackageRelocationEquipmentTableItem> => [
  {
    dataIndex: 'equipment',
    title: 'Наименование',
    render: (value: DocumentsPackageRelocationEquipmentTableItem['equipment']) => value.title,
  },
  {
    dataIndex: 'equipment',
    title: 'Серийный номер',
    render: (value: DocumentsPackageRelocationEquipmentTableItem['equipment']) =>
      value.serialNumber,
  },
  {
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: DocumentsPackageRelocationEquipmentTableItem['condition']) =>
      equipmentConditionDict[value],
  },
  {
    key: 'technicalExamination',
    dataIndex: 'condition',
    width: 150,
    render: (value: DocumentsPackageRelocationEquipmentTableItem['condition'], record) => (
      <Button
        disabled={
          value !== EquipmentConditionEnum.Broken && value !== EquipmentConditionEnum.NonRepairable
        }
        onClick={() => onClickTechnicalExamination(record.id)}
      >
        Данные АТЭ
      </Button>
    ),
  },
]
