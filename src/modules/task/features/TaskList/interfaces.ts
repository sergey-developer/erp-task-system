import { TaskListItemModel } from 'modules/task/models'

export type TaskListItem = Pick<
  TaskListItemModel,
  'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'
>

export type TaskListProps = {
  tasks: TaskListItem[]
}
