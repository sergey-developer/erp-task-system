import { TaskListItemModel } from 'modules/task/models'

import { MaybeNull } from 'shared/interfaces/utils'

export type TaskListItem = Pick<
  TaskListItemModel,
  'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'
>

export type TaskListProps = {
  tasks: TaskListItem[]
  selectedTaskId: MaybeNull<TaskListItem['id']>
  onClickTask: (id: TaskListItem['id']) => void
}
