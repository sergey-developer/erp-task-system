import { ExtendedSortKey } from 'shared/interfaces/sort'

import { FiscalAccumulatorTaskTableItem } from '../interfaces'

export type AscendSortKey =
  | 'address'
  | 'createdAt'
  | 'recordId'
  | 'supportGroup'
  | 'blockingIn'
  | 'title'
  | 'name'
  | 'olaNextBreachTime'
  | 'fiscalAccumulator'
  | 'deadlineOrTotalFiscalDocs'
  | 'sapId'

export type SortKey = ExtendedSortKey<AscendSortKey>

export type SortableField = keyof Pick<
  FiscalAccumulatorTaskTableItem,
  | 'address'
  | 'createdAt'
  | 'recordId'
  | 'supportGroup'
  | 'blockingIn'
  | 'name'
  | 'title'
  | 'olaNextBreachTime'
  | 'fiscalAccumulator'
  | 'deadlineOrTotalFiscalDocs'
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
  blockingIn: ['blockingIn', '-blockingIn'],
  title: ['title', '-title'],
  name: ['name', '-name'],
  olaNextBreachTime: ['olaNextBreachTime', '-olaNextBreachTime'],
  fiscalAccumulator: ['fiscalAccumulator', '-fiscalAccumulator'],
  deadlineOrTotalFiscalDocs: [
    'deadlineOrTotalFiscalDocs',
    '-deadlineOrTotalFiscalDocs',
  ],
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
