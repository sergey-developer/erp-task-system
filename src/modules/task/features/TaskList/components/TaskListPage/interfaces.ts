import { FastFilterEnum } from 'modules/task/features/TaskList/constants/common'

export type FastFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}
