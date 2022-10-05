import { TaskTableListItem } from '../interfaces'

export type AllColumnWidthMap =
  | 'noop'
  | keyof Pick<
      TaskTableListItem,
      | 'id'
      | 'recordId'
      | 'name'
      | 'title'
      | 'assignee'
      | 'workGroup'
      | 'olaNextBreachTime'
      | 'lastComment'
      | 'createdAt'
    >

export const defaultColumnWidthMap: Record<AllColumnWidthMap, number> = {
  noop: 25,
  id: 110,
  recordId: 140,
  name: 120,
  title: 160,
  assignee: 110,
  workGroup: 130,
  olaNextBreachTime: 105,
  lastComment: 160,
  createdAt: 105,
}

export type XxlColumnWidthMap = Exclude<AllColumnWidthMap, 'noop'>

export const xxlColumnWidthMap: Record<XxlColumnWidthMap, number> = {
  id: 110,
  recordId: 140,
  name: 140,
  title: 300,
  assignee: 140,
  workGroup: 140,
  olaNextBreachTime: 140,
  lastComment: 200,
  createdAt: 140,
}
