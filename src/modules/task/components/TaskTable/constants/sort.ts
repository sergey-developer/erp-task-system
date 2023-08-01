import { ExtendedSortKey } from 'shared/types/sort'

import { TaskTableListItem } from '../types'

export type AscendSortValue =
  | 'id'
  | 'name'
  | 'title'
  | 'status'
  | 'last_comment_text'
  | 'assignee__last_name'
  | 'record_id'
  | 'work_group__name'
  | 'support_group__name'
  | 'created_at'
  | 'ola_next_breach_time'

export type SortValue = ExtendedSortKey<AscendSortValue>

export type SortableField = keyof Pick<
  TaskTableListItem,
  | 'id'
  | 'name'
  | 'title'
  | 'status'
  | 'lastComment'
  | 'assignee'
  | 'recordId'
  | 'workGroup'
  | 'supportGroup'
  | 'createdAt'
  | 'olaNextBreachTime'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [AscendSortValue, Exclude<SortValue, AscendSortValue>]
> = {
  id: ['id', '-id'],
  name: ['name', '-name'],
  title: ['title', '-title'],
  status: ['status', '-status'],
  lastComment: ['last_comment_text', '-last_comment_text'],
  assignee: ['assignee__last_name', '-assignee__last_name'],
  recordId: ['record_id', '-record_id'],
  workGroup: ['work_group__name', '-work_group__name'],
  supportGroup: ['support_group__name', '-support_group__name'],
  createdAt: ['created_at', '-created_at'],
  olaNextBreachTime: ['ola_next_breach_time', '-ola_next_breach_time'],
}

export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, field) => {
  const sortableField = field as SortableField
  const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

  acc[ascendValue] = sortableField
  acc[descendValue] = sortableField

  return acc
}, {} as Record<SortValue, SortableField>)
