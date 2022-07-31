import { TaskListItemModel } from 'modules/task/components/TaskList/models'

export type AllColumnWidthMap =
  | 'noop'
  | keyof Pick<
      TaskListItemModel,
      | 'id'
      | 'recordId'
      | 'name'
      | 'title'
      | 'assignee'
      | 'workGroup'
      | 'olaNextBreachTime'
      | 'comment'
      | 'createdAt'
    >

export const defaultColumnWidthMap: Record<AllColumnWidthMap, number> = {
  noop: 20,
  id: 110,
  recordId: 140,
  name: 120,
  title: 160,
  assignee: 110,
  workGroup: 130,
  olaNextBreachTime: 105,
  comment: 160,
  createdAt: 105,
}

export type XxlColumnWidthMap = Exclude<AllColumnWidthMap, 'noop'>

export const xxlColumnWidthMap: Record<XxlColumnWidthMap, number> = {
  id: 75,
  recordId: 85,
  name: 100,
  title: 200,
  assignee: 140,
  workGroup: 160,
  olaNextBreachTime: 100,
  comment: 130,
  createdAt: 100,
}
