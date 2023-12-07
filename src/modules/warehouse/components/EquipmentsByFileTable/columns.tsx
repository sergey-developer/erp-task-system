import { ColumnsType } from 'antd/es/table'
import isBoolean from 'lodash/isBoolean'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { EditIcon } from 'components/Icons'

import { getYesNoWord } from 'shared/utils/common'

import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

type GetColumnsArgs = Pick<EquipmentsByFileTableProps, 'onEdit'>

export const getColumns = ({ onEdit }: GetColumnsArgs): ColumnsType<EquipmentByFileTableRow> => [
  {
    key: 'category',
    dataIndex: 'category',
    title: 'Категория',
    render: (value: EquipmentByFileTableRow['category']) => value?.title,
  },
  {
    key: 'nomenclature',
    dataIndex: 'nomenclature',
    title: 'Номенклатура',
    render: (value: EquipmentByFileTableRow['nomenclature']) => value?.title,
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'inventoryNumber',
    title: 'Инв. №',
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный №',
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: EquipmentByFileTableRow['condition']) => value && equipmentConditionDict[value],
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Стоимость',
  },
  {
    key: 'currency',
    dataIndex: 'currency',
    title: 'Валюта',
    render: (value: EquipmentByFileTableRow['currency']) => value?.title,
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
  },
  {
    key: 'nomenclature',
    dataIndex: 'nomenclature',
    title: 'Ед. изм.',
    render: (value: EquipmentByFileTableRow['nomenclature']) => value?.measurementUnit,
  },
  {
    key: 'isNew',
    dataIndex: 'isNew',
    title: 'Новое',
    render: (value: EquipmentByFileTableRow['isNew']) => isBoolean(value) && getYesNoWord(value),
  },
  {
    key: 'isWarranty',
    dataIndex: 'isWarranty',
    title: 'На гарантии',
    render: (value: EquipmentByFileTableRow['isWarranty']) =>
      isBoolean(value) && getYesNoWord(value),
  },
  {
    key: 'isRepaired',
    dataIndex: 'isRepaired',
    title: 'Отремонтиров.',
    render: (value: EquipmentByFileTableRow['isRepaired']) =>
      isBoolean(value) && getYesNoWord(value),
  },
  {
    key: 'usageCounter',
    dataIndex: 'usageCounter',
    title: 'Пробег',
  },
  {
    key: 'owner',
    dataIndex: 'owner',
    title: 'Владелец',
    render: (value: EquipmentByFileTableRow['owner']) => value?.title,
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
    render: (value: EquipmentByFileTableRow['purpose']) => value?.title,
  },
  {
    key: 'comment',
    dataIndex: 'comment',
    title: 'Комментарий',
  },
  {
    key: 'edit',
    width: 50,
    render: (value, record, index) => (
      <EditIcon
        $size='large'
        $cursor='pointer'
        $color='bleuDeFrance'
        onClick={() => onEdit(record, index)}
      />
    ),
  },
]
