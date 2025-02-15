import { TaskMapDTO } from 'features/tasks/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskListItem = Pick<TaskMapDTO, 'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'>

export type TaskListProps = {
  tasks: TaskListItem[]
  selectedTaskId: MaybeNull<TaskListItem['id']>
  onClickTask: (id: TaskListItem['id']) => void
}
