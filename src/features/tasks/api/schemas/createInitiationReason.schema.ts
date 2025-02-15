import { RequestWithTask } from 'features/tasks/api/types'

import { TaskInitiationReasonDTO } from '../dto'

export type CreateTaskInitiationReasonRequest = RequestWithTask & {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}

export type CreateTaskInitiationReasonResponse = TaskInitiationReasonDTO
