import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { Keys } from 'shared/interfaces/utils'

export type AllColumnWidthMap =
  | 'noop'
  | Keys<
      Pick<
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
  id: 110,
  recordId: 140,
  name: 140,
  title: 300,
  assignee: 140,
  workGroup: 140,
  olaNextBreachTime: 140,
  comment: 200,
  createdAt: 140,
}
