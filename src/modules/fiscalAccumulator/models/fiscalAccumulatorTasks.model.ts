import { TaskCommentModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { FiscalAccumulatorFormatEnum } from '../constants'

export type FiscalAccumulatorTaskListItemModel = {
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
  assignee: MaybeNull<Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>>
  comment: MaybeNull<Pick<TaskCommentModel, 'id' | 'text'>>
}

export type FiscalAccumulatorTasksModel = FiscalAccumulatorTaskListItemModel[]
