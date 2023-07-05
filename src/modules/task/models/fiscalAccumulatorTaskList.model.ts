import { FiscalAccumulatorFormatEnum } from 'modules/task/constants'

import { MaybeNull } from 'shared/interfaces/utils'

export type FiscalAccumulatorTaskListItemModel = {
  blockingIn: number
  olaNextBreachTime: string
  recordId: string
  sapId: string
  name: string
  address: string
  fiscalAccumulator: {
    faNumber: number
  }
  deadlineOrTotalFiscalDocs: number
  supportGroup: {
    id: number
    name: string
    macroregion: {
      id: number
      title: string
    }
  }
  title: string
  createdAt: string
  faFormat: MaybeNull<FiscalAccumulatorFormatEnum>
}

export type FiscalAccumulatorTaskListModel =
  Array<FiscalAccumulatorTaskListItemModel>
