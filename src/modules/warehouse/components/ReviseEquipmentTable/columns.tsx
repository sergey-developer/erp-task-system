import { ProColumns } from '@ant-design/pro-components'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import { DefaultOptionType } from 'rc-select/lib/Select'

import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { CheckCircleIcon, ExclamationCircleIcon } from 'components/Icons'

import { undefinedSelectOption } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import theme from 'styles/theme'

import { ReviseEquipmentTableItem, ReviseEquipmentTableProps } from './types'

type GetColumnsArgs = Pick<
  ReviseEquipmentTableProps,
  'locationsIsLoading' | 'onChangeQuantityFact' | 'onChangeLocationFact'
> & {
  locationOptions: DefaultOptionType[]
}

export const getColumns = ({
  locationOptions,
  locationsIsLoading,
  onChangeQuantityFact,
  onChangeLocationFact,
}: GetColumnsArgs): ProColumns<ReviseEquipmentTableItem>[] => {
  return [
    {
      key: 'title',
      dataIndex: 'equipment',
      title: 'Наименование',
      fieldProps: { disabled: true, placeholder: '-' },
      renderText: (dom, entity) => entity.equipment.title,
    },
    {
      key: 'serialNumber',
      dataIndex: 'equipment',
      title: 'Серийный номер',
      fieldProps: { disabled: true, placeholder: '-' },
      renderText: (dom, entity) => entity.equipment.serialNumber,
    },
    {
      key: 'inventoryNumber',
      dataIndex: 'equipment',
      title: 'Инвентарный номер',
      fieldProps: { disabled: true, placeholder: '-' },
      renderText: (dom, entity) => entity.equipment.inventoryNumber,
    },
    {
      key: 'locationPlan',
      dataIndex: 'locationPlan',
      title: 'Плановое местонахождение',
      fieldProps: { disabled: true, placeholder: '-' },
      renderText: (dom, entity) => entity.locationPlan?.title,
    },
    {
      key: 'quantityPlan',
      dataIndex: 'quantity',
      title: 'Количество',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: '-' },
      renderText: (dom, entity) => entity.quantity.plan,
    },
    {
      key: 'quantityFact',
      dataIndex: 'quantity',
      title: 'Наличие',
      valueType: 'digit',

      // @ts-ignore
      formItemProps: { 'data-testid': 'quantity-fact-form-item' },

      fieldProps: (form, config) => {
        const quantityFact: ReviseEquipmentTableItem['quantity']['fact'] = form.getFieldValue(
          (config.rowKey as unknown as string[]).concat('quantityFact'),
        )

        const quantityPlan: ReviseEquipmentTableItem['quantity']['plan'] = form.getFieldValue(
          (config.rowKey as unknown as string[]).concat('quantityPlan'),
        )

        const locationFact:
          | ReviseEquipmentTableItem['locationFact']
          | NonNullable<ReviseEquipmentTableItem['locationFact']>['id'] = form.getFieldValue(
          (config.rowKey as unknown as string[]).concat('locationFact'),
        )

        return {
          min: 0,
          ...(isNumber(quantityFact)
            ? quantityFact === quantityPlan
              ? { style: { borderColor: theme.colors.green } }
              : { status: 'error' }
            : {}),
          onBlur: async () => {
            await onChangeQuantityFact(
              config.entity,
              quantityFact,
              isObject(locationFact) ? locationFact.id : locationFact,
            )
          },
          defaultValue: null,
        }
      },
      renderText: (dom, entity) => entity.quantity.fact,
    },
    {
      key: 'locationFact',
      dataIndex: 'locationFact',
      title: 'Фактическое местонахождение',
      valueType: 'select',

      // @ts-ignore
      formItemProps: { 'data-testid': 'location-fact-form-item' },

      fieldProps: (form, config) => {
        const quantityFact: ReviseEquipmentTableItem['quantity']['fact'] = form.getFieldValue(
          (config.rowKey as unknown as string[]).concat('quantityFact'),
        )

        const quantityPlan: ReviseEquipmentTableItem['quantity']['plan'] = form.getFieldValue(
          (config.rowKey as unknown as string[]).concat('quantityPlan'),
        )

        const equipmentCategoryIsConsumable = checkEquipmentCategoryIsConsumable(
          config.entity.equipment.category.code,
        )

        const locationFact:
          | ReviseEquipmentTableItem['locationFact']
          | NonNullable<ReviseEquipmentTableItem['locationFact']>['id'] =
          form.getFieldValue((config.rowKey as unknown as string[]).concat('locationFact')) ||
          config.entity.locationFact

        const locationPlan: ReviseEquipmentTableItem['locationPlan'] = config.entity.locationPlan

        return {
          loading: locationsIsLoading,
          options: locationOptions,
          virtual: true,
          allowClear: false,
          showSearch: true,
          filterOption: filterOptionBy('label'),
          onChange: (value: IdType) => onChangeLocationFact(config.entity, value, quantityFact),
          disabled:
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
