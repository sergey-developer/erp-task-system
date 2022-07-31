import { TaskListItemModel } from 'modules/task/components/TaskList/models'

export type AllColumnWidthMapKeys =
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

export const defaultColumnWidthMap: Record<AllColumnWidthMapKeys, number> = {
  noop: 20,
  id: 110,
  recordId: 140,
  name: 120,
  title: 160,
  assignee: 100,
  workGroup: 100,
  olaNextBreachTime: 80,
  comment: 160,
  createdAt: 80,
}

export type XxlColumnWidthMapKeys = Exclude<
  AllColumnWidthMapKeys,
  'noop' | 'id' | 'recordId'
>

export const xxlColumnWidthMap: Record<XxlColumnWidthMapKeys, number> = {
  name: 140,
  title: 300,
  assignee: 140,
  workGroup: 140,
  olaNextBreachTime: 140,
  comment: 200,
  createdAt: 140,
}
