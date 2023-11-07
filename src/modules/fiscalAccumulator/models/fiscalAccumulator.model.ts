import { FiscalAccumulatorFormatEnum } from 'modules/fiscalAccumulator/constants'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type FiscalAccumulatorModel = {
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
