import { ProColumns } from '@ant-design/pro-components'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import { DefaultOptionType } from 'rc-select/lib/Select'

import { checkEquipmentCategoryIsConsumable } from 'features/warehouse/utils/equipment'

import { CheckCircleIcon, ExclamationCircleIcon } from 'components/Icons'

import { undefinedSelectOption } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import theme from 'styles/theme'

import {
  ReviseInventorizationEquipmentTableItem,
  ReviseInventorizationEquipmentTableProps,
} from './types'

type GetColumnsArgs = Pick<
  ReviseInventorizationEquipmentTableProps,
  | 'locationsIsLoading'
  | 'onChangeQuantityFact'
  | 'changeQuantityFactIsLoading'
  | 'onChangeLocationFact'
  | 'changeLocationFactIsLoading'
> & {
  locationOptions: DefaultOptionType[]
}

export const tableName = 'ReviseInventorizationEquipmentTable'

export const getColumns = ({
  locationOptions,
  locationsIsLoading,

  onChangeQuantityFact,
  changeQuantityFactIsLoading,

  onChangeLocationFact,
  changeLocationFactIsLoading,
}: GetColumnsArgs): ProColumns<ReviseInventorizationEquipmentTableItem>[] => {
  return [
    {
      dataIndex: ['equipment', 'title'],
      title: 'Наименование',
      fieldProps: { disabled: true, placeholder: '-' },
    },
    {
      dataIndex: ['equipment', 'serialNumber'],
      title: 'Серийный номер',
      fieldProps: { disabled: true, placeholder: '-' },
    },
    {
      dataIndex: ['equipment', 'inventoryNumber'],
      title: 'Инвентарный номер',
      fieldProps: { disabled: true, placeholder: '-' },
    },
    {
      dataIndex: ['locationPlan', 'title'],
      title: 'Плановое местонахождение',
      fieldProps: { disabled: true, placeholder: '-' },
    },
    {
      dataIndex: ['quantity', 'plan'],
      title: 'Количество',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: '-' },
    },
    {
      dataIndex: ['quantity', 'fact'],
      title: 'Наличие',
      valueType: 'digit',

      // @ts-ignore
      formItemProps: { 'data-testid': 'quantity-fact-form-item' },

      fieldProps: (form, config) => {
        const quantityFact: ReviseInventorizationEquipmentTableItem['quantity']['fact'] =
          form.getFieldValue((config.rowKey as unknown as string[]).concat('fact'))

        const quantityPlan: ReviseInventorizationEquipmentTableItem['quantity']['plan'] =
          form.getFieldValue((config.rowKey as unknown as string[]).concat('plan'))

        const locationFact: NonNullable<ReviseInventorizationEquipmentTableItem['locationFact']> =
          form.getFieldValue([tableName, config.rowIndex, 'locationFact'])

        return {
          min: 0,
          ...(isNumber(quantityFact)
            ? quantityFact === quantityPlan
              ? { style: { borderColor: theme.colors.green } }
              : { status: 'error' }
            : {}),
          disabled: changeQuantityFactIsLoading,
          onBlur: async () => {
            form.setFieldValue([tableName, config.rowIndex, 'quantity', 'fact'], quantityFact)
            await onChangeQuantityFact(config.entity, quantityFact, locationFact)
          },
          defaultValue: null,
        }
      },
    },
    {
      dataIndex: 'locationFact',
      title: 'Фактическое местонахождение',
      valueType: 'select',

      // @ts-ignore
      formItemProps: { 'data-testid': 'location-fact-form-item' },

      fieldProps: (form, config) => {
        const quantityFact: ReviseInventorizationEquipmentTableItem['quantity']['fact'] =
          form.getFieldValue((config.rowKey as unknown as string[]).concat(['quantity', 'fact']))

        const quantityPlan: ReviseInventorizationEquipmentTableItem['quantity']['plan'] =
          form.getFieldValue((config.rowKey as unknown as string[]).concat(['quantity', 'plan']))

        const equipmentCategoryIsConsumable = checkEquipmentCategoryIsConsumable(
          form.getFieldValue([tableName, config.rowIndex, 'equipment', 'category', 'code']),
        )

        const locationFact: ReviseInventorizationEquipmentTableItem['locationFact'] =
          form.getFieldValue([tableName, config.rowIndex, 'locationFact'])

        const locationPlan: ReviseInventorizationEquipmentTableItem['locationPlan'] =
          form.getFieldValue([tableName, config.rowIndex, 'locationPlan'])

        return {
          loading: locationsIsLoading,
          options: locationOptions,
          virtual: true,
          allowClear: false,
          showSearch: true,
          filterOption: filterOptionBy('label'),
          onChange: async (value: IdType, option: any) => {
            const newValue = { title: option.label, id: option.value }
            form.setFieldValue([tableName, config.rowIndex, 'locationFact'], newValue)
            await onChangeLocationFact(config.entity, newValue, quantityFact)
          },
          disabled:
            changeLocationFactIsLoading ||
            locationsIsLoading ||
            !(
              isNumber(quantityFact) &&
              (!equipmentCategoryIsConsumable ||
                (equipmentCategoryIsConsumable && quantityPlan === 0))
            ),
          value: config.entity.isLocationFactUndefined
            ? undefinedSelectOption.value
            : !isNil(locationFact)
            ? isObject(locationFact)
              ? locationFact.id
              : locationFact
            : undefined,
          ...(!isNil(locationFact) && !isNil(locationPlan)
            ? isObject(locationFact)
              ? locationFact.id === locationPlan.id
                ? { style: { borderColor: theme.colors.green } }
                : { status: 'error' }
              : locationFact === locationPlan.id
              ? { style: { borderColor: theme.colors.green } }
              : { status: 'error' }
            : {}),
        }
      },
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
}
