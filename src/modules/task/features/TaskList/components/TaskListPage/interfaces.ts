import { FastFilterEnum } from 'modules/task/features/TaskList/constants/enums'
import { MaybeNull } from 'shared/interfaces/utils'

export type FastFilterQueries = {
  filter?: MaybeNull<FastFilterEnum>
}

export type TaskIdFilterQueries = {
  taskId?: string
}
