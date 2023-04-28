import { TaskTableColumnKey } from '../interfaces'

export type AllColumnWidthMap = TaskTableColumnKey

export const defaultColumnWidthMap: Record<AllColumnWidthMap, number> = {
  noop: 25,
  id: 80,
  recordId: 140,
  name: 120,
  title: 150,
  assignee: 110,
  workGroup: 130,
  supportGroup: 130,
  responseTime: 110,
  olaNextBreachTime: 105,
  status: 100,
  subtasksCounter: 55,
  lastComment: 160,
  createdAt: 105,
}

export type XxlColumnWidthMap = Exclude<AllColumnWidthMap, 'noop'>

export const xxlColumnWidthMap: Record<XxlColumnWidthMap, number> = {
  id: 80,
  recordId: 140,
  name: 140,
  title: 250,
  assignee: 140,
  workGroup: 140,
  supportGroup: 140,
  responseTime: 110,
  olaNextBreachTime: 140,
  status: 110,
  subtasksCounter: 55,
  lastComment: 200,
  createdAt: 140,
}
