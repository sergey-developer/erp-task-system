import { TaskCommentDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

export type GetTaskCommentsRequest = RequestWithTask
export type GetTaskCommentsResponse = TaskCommentDTO[]
