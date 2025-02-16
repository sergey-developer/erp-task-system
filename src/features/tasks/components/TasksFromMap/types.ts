import { TaskMapDTO } from 'features/tasks/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskFromMap = Pick<TaskMapDTO, 'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'>

export type TasksFromMapProps = {
  tasks: TaskFromMap[]
  selectedTaskId: MaybeNull<TaskFromMap['id']>
  onClickTask: (id: TaskFromMap['id']) => void
}
