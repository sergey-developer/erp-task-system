import { TaskTableListItem } from '../interfaces'

export type AscendSortValue =
  | 'id'
  | 'name'
  | 'title'
  | 'last_comment_text'
  | 'assignee__last_name'
  | 'record_id'
  | 'work_group__name'
  | 'created_at'
  | 'ola_next_breach_time'

export type DescendSortValue = `-${AscendSortValue}`

export type SortValue = AscendSortValue | DescendSortValue

export type SortableFieldKey = keyof Pick<
  TaskTableListItem,
  | 'id'
  | 'name'
  | 'title'
  | 'comment'
  | 'assignee'
  | 'recordId'
  | 'workGroup'
  | 'createdAt'
  | 'olaNextBreachTime'
>

export const sortableFieldToSortValues: Record<
  SortableFieldKey,
  [AscendSortValue, DescendSortValue]
> = {
  id: ['id', '-id'],
  name: ['name', '-name'],
  title: ['title', '-title'],
  comment: ['last_comment_text', '-last_comment_text'],
  assignee: ['assignee__last_name', '-assignee__last_name'],
  recordId: ['record_id', '-record_id'],
  workGroup: ['work_group__name', '-work_group__name'],
  createdAt: ['created_at', '-created_at'],
  olaNextBreachTime: ['ola_next_breach_time', '-ola_next_breach_time'],
}

export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, key) => {
  const sortableFieldKey = key as SortableFieldKey
  const [ascendValue, descendValue] =
    sortableFieldToSortValues[sortableFieldKey]

  acc[ascendValue] = sortableFieldKey
  acc[descendValue] = sortableFieldKey

  return acc
}, {} as Record<SortValue, SortableFieldKey>)
