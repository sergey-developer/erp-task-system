import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'

import { CompletedWorkModel } from './completedWork.model'

export type CreateCompletedWorkMutationArgs = TaskRequestArgs & {
  title: string
  quantity: number
  measurementUnit: IdType
}

export type CreateCompletedWorkSuccessResponse = CompletedWorkModel
