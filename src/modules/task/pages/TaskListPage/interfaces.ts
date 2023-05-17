import { FastFilterEnum } from 'modules/task/features/FastFilter/constants'

export type FastFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}
