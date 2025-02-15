import { TaskDTO } from 'features/tasks/api/dto'

export type TaskMapDTO = Pick<TaskDTO, 'id' | 'type' | 'name' | 'title' | 'olaNextBreachTime'> & {
  lat: string
  long: string
}

export type TasksMapDTO = TaskMapDTO[]
