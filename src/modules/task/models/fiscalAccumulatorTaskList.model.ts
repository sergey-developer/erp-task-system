import { FiscalAccumulatorFormatEnum } from 'modules/task/constants'

import { MaybeNull } from 'shared/interfaces/utils'

export type FiscalAccumulatorTaskListItemModel = {
  blockingIn: MaybeNull<number>
  olaNextBreachTime: string
  recordId: string
  sapId: string
  name: string
  address: string
  fiscalAccumulator: MaybeNull<{
    id: number
    faNumber: number
  }>
  deadlineOrTotalFiscalDocs: MaybeNull<number>
  supportGroup: {
    id: number
    name: string
    macroregion: MaybeNull<{
      id: number
      title: string
    }>
  }
  title: string
  createdAt: string
  faFormat: MaybeNull<FiscalAccumulatorFormatEnum>
}

export type FiscalAccumulatorTaskListModel =
  Array<FiscalAccumulatorTaskListItemModel>
