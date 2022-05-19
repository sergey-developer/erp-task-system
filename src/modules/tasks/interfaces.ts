import { MaybeNull } from 'shared/interfaces/utils'

import { Task } from './models'

export interface ITasksSliceState {
  selectedTask: MaybeNull<Task>
}
