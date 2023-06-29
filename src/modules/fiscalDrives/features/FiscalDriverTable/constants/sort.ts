import { ExtendedSortKey } from 'shared/interfaces/sort'

import { FiscalDriverTableItem } from '../interfaces'

export type AscendSortKey =
  | 'address'
  | 'createdAt'
  | 'recordId'
  | 'supportGroup'
  | 'mr'
  | 'blockThrough'
  | 'category'
  | 'client'
  | 'deadline'
  | 'fiscalDriverId'
  | 'totalFd'
  | 'sapId'

export type SortKey = ExtendedSortKey<AscendSortKey>

export type SortableField = keyof Pick<
  FiscalDriverTableItem,
  | 'address'
  | 'category'
  | 'createdAt'
  | 'recordId'
  | 'supportGroup'
  | 'mr'
  | 'blockThrough'
  | 'client'
  | 'deadline'
  | 'fiscalDriverId'
  | 'totalFd'
  | 'sapId'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [AscendSortKey, Exclude<SortKey, AscendSortKey>]
> = {
  address: ['address', '-address'],
  createdAt: ['createdAt', '-createdAt'],
  recordId: ['recordId', '-recordId'],
  supportGroup: ['supportGroup', '-supportGroup'],
  mr: ['mr', '-mr'],
  blockThrough: ['blockThrough', '-blockThrough'],
  category: ['category', '-category'],
  client: ['client', '-client'],
  deadline: ['deadline', '-deadline'],
  fiscalDriverId: ['fiscalDriverId', '-fiscalDriverId'],
  totalFd: ['totalFd', '-totalFd'],
  sapId: ['sapId', '-sapId'],
}

export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, field) => {
  const sortableField = field as SortableField
  const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

  acc[ascendValue] = sortableField
  acc[descendValue] = sortableField

  return acc
}, {} as Record<SortKey, SortableField>)
