import { ColumnsType } from 'antd/es/table'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import { CSSProperties } from 'react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { EditIcon } from 'components/Icons'

import { ValidationErrors } from 'shared/services/baseApi'
import { ArrayFirst, MaybeUndefined } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'

import theme from 'styles/theme'

import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

type GetColumnsArgs = Pick<EquipmentsByFileTableProps, 'onEdit' | 'dataSource' | 'errors'>

const errorCellStyles: Record<'style', CSSProperties> = {
  style: { backgroundColor: theme.colors.fireOpal, opacity: 0.85 },
}

const extractColumnError = (
  name: keyof ArrayFirst<NonNullable<GetColumnsArgs['errors']>>,
  errors?: GetColumnsArgs['errors'],
  index?: number,
): MaybeUndefined<ValidationErrors> =>
  errors?.length && isNumber(index) ? errors[index][name] : undefined

export const getColumns = ({
  onEdit,
  dataSource,
  errors,
}: GetColumnsArgs): ColumnsType<EquipmentByFileTableRow> => [
  {
    key: 'category',
    dataIndex: 'category',
    title: 'Категория',
    render: (value: EquipmentByFileTableRow['category']) => value?.title,
    onCell: ({ category }, index) => {
      const colErrors = extractColumnError('category', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : category ? {} : errorCellStyles
    },
  },
  {
    key: 'nomenclature',
    dataIndex: 'nomenclature',
    title: 'Номенклатура',
    render: (value: EquipmentByFileTableRow['nomenclature']) => value?.title,
    onCell: ({ nomenclature }, index) => {
      const colErrors = extractColumnError('nomenclature', errors, index)
      return colErrors
        ? { errors: colErrors, ...errorCellStyles }
        : nomenclature
        ? {}
        : errorCellStyles
    },
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'inventoryNumber',
    title: 'Инв. №',
    onCell: (record, index) => {
      const colErrors = extractColumnError('customerInventoryNumber', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный №',
    onCell: ({ serialNumber, category, nomenclature }, index) => {
      const colErrors = extractColumnError('serialNumber', errors, index)
      if (colErrors) {
        return { errors: colErrors, ...errorCellStyles }
      } else if (serialNumber) {
        const duplicates = dataSource.filter((item) => item.serialNumber === serialNumber)
        return duplicates.length > 1 ? errorCellStyles : {}
      } else if (nomenclature?.equipmentHasSerialNumber) {
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
    onCell: ({ condition }, index) => {
      const colErrors = extractColumnError('condition', errors, index)
      return colErrors
        ? { errors: colErrors, ...errorCellStyles }
        : condition
        ? {}
        : errorCellStyles
    },
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Стоимость',
    onCell: (record, index) => {
      const colErrors = extractColumnError('price', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
  },
  {
    key: 'currency',
    dataIndex: 'currency',
    title: 'Валюта',
    render: (value: EquipmentByFileTableRow['currency']) => value?.title,
    onCell: (record, index) => {
      const colErrors = extractColumnError('currency', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    onCell: ({ quantity, category }, index) => {
      const colErrors = extractColumnError('quantity', errors, index)
      if (colErrors) {
        return { errors: colErrors, ...errorCellStyles }
      } else if (
        !isNumber(quantity) &&
        category &&
        checkEquipmentCategoryIsConsumable(category.code)
      ) {
        return errorCellStyles
      } else {
        return {}
      }
    },
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
    onCell: ({ isNew, category }, index) => {
      const colErrors = extractColumnError('isNew', errors, index)
      if (colErrors) {
        return { errors: colErrors, ...errorCellStyles }
      } else if (
        !isBoolean(isNew) &&
        category &&
        !checkEquipmentCategoryIsConsumable(category.code)
      ) {
        return errorCellStyles
      } else {
        return {}
      }
    },
  },
  {
    key: 'isWarranty',
    dataIndex: 'isWarranty',
    title: 'На гарантии',
    render: (value: EquipmentByFileTableRow['isWarranty']) =>
      isBoolean(value) && getYesNoWord(value),
    onCell: ({ isWarranty, category }, index) => {
      const colErrors = extractColumnError('isWarranty', errors, index)
      if (colErrors) {
        return { errors: colErrors, ...errorCellStyles }
      } else if (
        !isBoolean(isWarranty) &&
        category &&
        !checkEquipmentCategoryIsConsumable(category.code)
      ) {
        return errorCellStyles
      } else {
        return {}
      }
    },
  },
  {
    key: 'isRepaired',
    dataIndex: 'isRepaired',
    title: 'Отремонтиров.',
    render: (value: EquipmentByFileTableRow['isRepaired']) =>
      isBoolean(value) && getYesNoWord(value),
    onCell: ({ isRepaired, category }, index) => {
      const colErrors = extractColumnError('isRepaired', errors, index)
      if (colErrors) {
        return { errors: colErrors, ...errorCellStyles }
      } else if (
        !isBoolean(isRepaired) &&
        category &&
        !checkEquipmentCategoryIsConsumable(category.code)
      ) {
        return errorCellStyles
      } else {
        return {}
      }
    },
  },
  {
    key: 'usageCounter',
    dataIndex: 'usageCounter',
    title: 'Пробег',
    onCell: (record, index) => {
      const colErrors = extractColumnError('usageCounter', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
  },
  {
    key: 'owner',
    dataIndex: 'owner',
    title: 'Владелец',
    render: (value: EquipmentByFileTableRow['owner']) => value?.title,
    onCell: (record, index) => {
      const colErrors = extractColumnError('owner', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
    render: (value: EquipmentByFileTableRow['purpose']) => value?.title,
    onCell: ({ purpose }, index) => {
      const colErrors = extractColumnError('purpose', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : purpose ? {} : errorCellStyles
    },
  },
  {
    key: 'comment',
    dataIndex: 'comment',
    title: 'Комментарий',
    onCell: (record, index) => {
      const colErrors = extractColumnError('comment', errors, index)
      return colErrors ? { errors: colErrors, ...errorCellStyles } : {}
    },
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
