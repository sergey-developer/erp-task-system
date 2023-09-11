import { FiscalAccumulatorFormatEnum } from 'modules/task/constants'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type FiscalAccumulatorTaskListItemModel = {
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
}

export type FiscalAccumulatorTaskListModel = FiscalAccumulatorTaskListItemModel[]
