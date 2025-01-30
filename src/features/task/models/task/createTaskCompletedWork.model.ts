import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

import { TaskCompletedWorkModel } from './taskCompletedWork.model'

export type CreateTaskCompletedWorkMutationArgs = TaskRequestArgs & {
  title: string
  quantity: number
  measurementUnit: IdType
}

export type CreateTaskCompletedWorkSuccessResponse = TaskCompletedWorkModel
