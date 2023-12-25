import { ColumnsType } from 'antd/es/table'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import { CSSProperties } from 'react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { EditIcon } from 'components/Icons'

import { getYesNoWord } from 'shared/utils/common'

import theme from 'styles/theme'

import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

type GetColumnsArgs = Pick<EquipmentsByFileTableProps, 'onEdit' | 'dataSource'>

const errorCellStyles: Record<'style', CSSProperties> = {
  style: { backgroundColor: theme.colors.fireOpal, opacity: 0.85 },
}

export const getColumns = ({
  onEdit,
  dataSource,
}: GetColumnsArgs): ColumnsType<EquipmentByFileTableRow> => [
  {
    key: 'category',
    dataIndex: 'category',
    title: 'Категория',
    render: (value: EquipmentByFileTableRow['category']) => value?.title,
    onCell: ({ category }) => (category ? {} : errorCellStyles),
  },
  {
    key: 'nomenclature',
    dataIndex: 'nomenclature',
    title: 'Номенклатура',
    render: (value: EquipmentByFileTableRow['nomenclature']) => value?.title,
    onCell: ({ nomenclature }) => (nomenclature ? {} : errorCellStyles),
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
    onCell: ({ serialNumber, category }) => {
      if (serialNumber) {
        const duplicates = dataSource.filter((item) => item.serialNumber === serialNumber)
        return duplicates.length > 1 ? errorCellStyles : {}
      } else if (category && !checkEquipmentCategoryIsConsumable(category.code)) {
        return errorCellStyles
      } else {
        return {}
      }
    },
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: EquipmentByFileTableRow['condition']) => value && equipmentConditionDict[value],
    onCell: ({ condition }) => (condition ? {} : errorCellStyles),
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
    onCell: ({ quantity, category }) =>
      !isNumber(quantity) && category && checkEquipmentCategoryIsConsumable(category.code)
        ? errorCellStyles
        : {},
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
    onCell: ({ isNew, category }) =>
      !isBoolean(isNew) && category && !checkEquipmentCategoryIsConsumable(category.code)
        ? errorCellStyles
        : {},
  },
  {
    key: 'isWarranty',
    dataIndex: 'isWarranty',
    title: 'На гарантии',
    render: (value: EquipmentByFileTableRow['isWarranty']) =>
      isBoolean(value) && getYesNoWord(value),
    onCell: ({ isWarranty, category }) =>
      !isBoolean(isWarranty) && category && !checkEquipmentCategoryIsConsumable(category.code)
        ? errorCellStyles
        : {},
  },
  {
    key: 'isRepaired',
    dataIndex: 'isRepaired',
    title: 'Отремонтиров.',
    render: (value: EquipmentByFileTableRow['isRepaired']) =>
      isBoolean(value) && getYesNoWord(value),
    onCell: ({ isRepaired, category }) =>
      !isBoolean(isRepaired) && category && !checkEquipmentCategoryIsConsumable(category.code)
        ? errorCellStyles
        : {},
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
    onCell: ({ purpose }) => (purpose ? {} : errorCellStyles),
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
