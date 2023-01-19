import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type GetTaskReclassificationRequestQueryArgs =
  BaseTaskRequestArgs['taskId']

export type GetTaskReclassificationRequestSuccessResponse =
  TaskReclassificationRequestModel
