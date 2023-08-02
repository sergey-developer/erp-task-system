import { BaseTaskRequestArgs } from 'modules/task/types'

import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type GetTaskReclassificationRequestQueryArgs =
  BaseTaskRequestArgs['taskId']

export type GetTaskReclassificationRequestSuccessResponse =
  TaskReclassificationRequestModel
