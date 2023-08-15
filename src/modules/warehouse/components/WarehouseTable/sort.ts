import {
  GetWarehouseListSortKey,
  GetWarehouseListSortValue,
} from 'modules/warehouse/models'

import { WarehouseTableItem } from './types'

export type SortableField = keyof Pick<
  WarehouseTableItem,
  'title' | 'legalEntity' | 'address' | 'parent'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    GetWarehouseListSortKey,
    Exclude<GetWarehouseListSortValue, GetWarehouseListSortKey>,
  ]
> = {
  title: ['title', '-title'],
  address: ['address', '-address'],
  parent: ['parent', '-parent'],
  legalEntity: ['legal_entity', '-legal_entity'],
}

// todo: создать функцию для переиспользования
export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, field) => {
  const sortableField = field as SortableField
  const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

  acc[ascendValue] = sortableField
  acc[descendValue] = sortableField

  return acc
}, {} as Record<GetWarehouseListSortValue, SortableField>)
