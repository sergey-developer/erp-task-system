import { FastFilterEnum } from 'modules/task/components/FastFilterList/constants'

export type FastFilterQueries = Partial<{
  filter: FastFilterEnum
}>

export type TaskIdFilterQueries = Partial<{
  taskId: string
}>
