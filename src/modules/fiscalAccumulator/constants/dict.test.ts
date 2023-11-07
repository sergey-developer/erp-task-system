import { FiscalAccumulatorFormatEnum } from 'modules/fiscalAccumulator/constants'

import { fiscalAccumulatorFormatColorDict } from './dict'

test('fiscal accumulator format color', () => {
  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.Dubbed]).toBe('#6600ff')

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess7]).toBe(
    '#F2994A',
  )

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess15]).toBe(
    '#EB5757',
  )

  expect(fiscalAccumulatorFormatColorDict[FiscalAccumulatorFormatEnum.OutOfMemoryLess21]).toBe(
    '#F2994A',
  )
})
