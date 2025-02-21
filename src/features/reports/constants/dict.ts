import { StringMap } from 'shared/types/utils'

import theme from 'styles/theme'

import { FiscalAccumulatorFormatEnum } from '../api/constants'

// todo: вынести #6600ff в theme.colors
export const fiscalAccumulatorFormatColorDict: Readonly<StringMap<FiscalAccumulatorFormatEnum>> = {
  [FiscalAccumulatorFormatEnum.Dubbed]: '#6600ff',
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess7]: theme.colors.royalOrange,
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess15]: theme.colors.fireOpal,
  [FiscalAccumulatorFormatEnum.OutOfMemoryLess21]: theme.colors.royalOrange,
}
