import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'

import { TaskCompletedWorkModel } from './taskCompletedWork.model'

export type CreateTaskCompletedWorkRequest = RequestWithTask & {
  title: string
  quantity: number
  measurementUnit: IdType
}

export type CreateTaskCompletedWorkResponse = TaskCompletedWorkModel
