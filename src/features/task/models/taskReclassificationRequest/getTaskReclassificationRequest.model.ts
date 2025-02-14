import { TaskReclassificationRequestModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

export type GetTaskReclassificationRequestRequest = RequestWithTask

export type GetTaskReclassificationRequestResponse = TaskReclassificationRequestModel
