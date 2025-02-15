import { FiscalAccumulatorFormatEnum } from 'features/reports/api/constants'
import { TaskCommentDTO } from 'features/tasks/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type FiscalAccumulatorTaskDTO = {
  id: IdType
  blockingIn: MaybeNull<number>
  olaNextBreachTime: string
  recordId: string
  sapId: string
  name: string
  address: string
  fiscalAccumulator: MaybeNull<{
    id: IdType
    faNumber: number
  }>
  deadlineOrTotalFiscalDocs: MaybeNull<number>
  supportGroup: {
    id: IdType
    name: string
    macroregion: MaybeNull<{
      id: IdType
      title: string
    }>
  }
  title: string
  createdAt: string
  faFormat: MaybeNull<FiscalAccumulatorFormatEnum>
  assignee: MaybeNull<Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>>
  comment: MaybeNull<Pick<TaskCommentDTO, 'id' | 'text'>>
}

export type FiscalAccumulatorTasksDTO = FiscalAccumulatorTaskDTO[]
