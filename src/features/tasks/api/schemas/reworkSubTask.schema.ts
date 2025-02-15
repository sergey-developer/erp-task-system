import { RequestWithSubTask, RequestWithTask } from 'features/tasks/api/types'

export type ReworkSubTaskRequest = RequestWithTask &
  RequestWithSubTask & {
    returnReason: string
  }

export type ReworkSubTaskResponse = void
