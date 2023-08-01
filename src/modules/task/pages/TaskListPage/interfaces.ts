import { FastFilterEnum } from 'modules/task/features/FastFilterList/constants'

export type FastFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}
