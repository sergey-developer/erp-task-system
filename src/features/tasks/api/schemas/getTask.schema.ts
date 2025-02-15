import { TaskDTO, TaskDetailDTO } from 'features/tasks/api/dto'

export type GetTaskRequest = TaskDTO['id']
export type GetTaskResponse = TaskDetailDTO
