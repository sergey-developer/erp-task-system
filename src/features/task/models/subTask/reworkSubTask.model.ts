import { RequestWithSubTask, RequestWithTask } from 'features/task/types'

export type ReworkSubTaskRequest = RequestWithTask &
  RequestWithSubTask & {
    returnReason: string
  }

export type ReworkSubTaskResponse = void
