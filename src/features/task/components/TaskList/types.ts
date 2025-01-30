import { TaskListMapItemModel } from 'features/task/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskListItem = Pick<
  TaskListMapItemModel,
  'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'
>

export type TaskListProps = {
  tasks: TaskListItem[]
  selectedTaskId: MaybeNull<TaskListItem['id']>
  onClickTask: (id: TaskListItem['id']) => void
}
