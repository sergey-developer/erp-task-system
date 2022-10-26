import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type GetTaskReclassificationRequestQueryArgsModel =
  BaseTaskRequestArgs['taskId']

export type GetTaskReclassificationRequestResponseModel =
  TaskReclassificationRequestModel
