import { FiscalAccumulatorFormatEnum } from 'modules/task/constants'

import { StringMap } from 'shared/types/utils'

export const fiscalAccumulatorFormatColorDict: Readonly<StringMap<FiscalAccumulatorFormatEnum>> = {
  [FiscalAccumulatorFormatEnum.Dubbed]: '#6600ff',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess7]: '#F2994A',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess15]: '#EB5757',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess21]: '#F2994A',
}
