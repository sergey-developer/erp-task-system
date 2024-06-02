import { ProColumns } from '@ant-design/pro-components'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { CheckCircleIcon, ExclamationCircleIcon } from 'components/Icons'

import { MaybeNull } from 'shared/types/utils'

import theme from 'styles/theme'

import { InventorizationEquipmentTableItem } from './types'

export const columns: ProColumns<InventorizationEquipmentTableItem>[] = [
  {
    key: 'title',
    dataIndex: 'equipment',
    title: 'Наименование',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.title,
  },
  {
    key: 'serialNumber',
    dataIndex: 'equipment',
    title: 'Серийный номер',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.serialNumber,
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'equipment',
    title: 'Инвентарный номер',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.inventoryNumber,
  },
  {
    key: 'locationPlan',
    dataIndex: 'locationPlan',
    title: 'Плановое местонахождение',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.locationPlan?.title,
  },
  {
    key: 'quantityPlan',
    dataIndex: 'quantity',
    title: 'Количество',
    valueType: 'digit',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.quantity.plan,
  },
  {
    key: 'quantityFact',
    dataIndex: 'quantity',
    title: 'Наличие',
    valueType: 'digit',
    fieldProps: (form, config) => {
      const quantityFact: MaybeNull<number> = form.getFieldValue(
        (config.rowKey as unknown as string[]).concat('quantityFact'),
      )

      const quantityPlan: number = form.getFieldValue(
        (config.rowKey as unknown as string[]).concat('quantityPlan'),
      )

      return {
        disabled: false,
        min: 0,
        ...(isNumber(quantityFact)
          ? quantityFact === quantityPlan
            ? { style: { borderColor: theme.colors.green } }
            : { status: 'error' }
          : {}),
      }
    },
    renderText: (dom, entity) => entity.quantity.fact,
  },
  {
    key: 'divergenceIndicator',
    width: 35,
    renderFormItem: (schema, { record }) => {
      return !!record?.isFilled && isBoolean(record.hasDiff) ? (
        record.hasDiff ? (
          <ExclamationCircleIcon $color='fireOpal' $size='large' />
        ) : (
          <CheckCircleIcon $color='green' $size='large' />
        )
      ) : null
    },
  },
]
