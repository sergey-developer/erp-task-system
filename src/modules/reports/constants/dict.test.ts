import { FiscalAccumulatorFormatEnum } from 'modules/reports/constants'

import theme from 'styles/theme'

import { fiscalAccumulatorFormatColorDict } from './dict'

test('fiscal accumulator format color', () => {
  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.Dubbed]).toBe('#6600ff')

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess7]).toBe(
    theme.colors.royalOrange,
  )

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess15]).toBe(
    theme.colors.fireOpal,
  )

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess21]).toBe(
    theme.colors.royalOrange,
  )
})
