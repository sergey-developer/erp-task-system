import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { valueOr } from 'shared/utils/common'

import { RelocationEquipmentTableItem, RelocationEquipmentTableProps } from './types'

type GetColumnsArgs = {
  onClickImages: RelocationEquipmentTableProps['onClickImages']
}

export const getColumns = ({
  onClickImages,
}: GetColumnsArgs): ColumnsType<RelocationEquipmentTableItem> => [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Оборудование',
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный номер',
    render: (value: RelocationEquipmentTableItem['serialNumber']) => valueOr(value),
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: RelocationEquipmentTableItem['condition']) => equipmentConditionDict[value],
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Стоимость',
    render: (value: RelocationEquipmentTableItem['price']) => valueOr(value),
  },
  {
    key: 'currency',
    dataIndex: 'currency',
    title: 'Валюта',
    render: (value: RelocationEquipmentTableItem['currency']) => valueOr(value?.title),
  },
  {
    key: 'images',
    title: 'Изображения',
    render: (value, record) => (
      <Button type='link' onClick={(event) => onClickImages(event, record)}>
        Посмотреть
      </Button>
    ),
  },
]
