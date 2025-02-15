import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'

import { TaskCompletedWorkDTO } from '../dto'

export type CreateTaskCompletedWorkRequest = RequestWithTask & {
  title: string
  quantity: number
  measurementUnit: IdType
}

export type CreateTaskCompletedWorkResponse = TaskCompletedWorkDTO
