import { FastFilterOptionType } from 'features/tasks/components/FastFilters/options'
import { FastFiltersProps } from 'features/tasks/components/FastFilters/types'

import { fakeWord } from '_tests_/utils'

export const option: FastFilterOptionType<string> = {
  label: fakeWord(),
  value: fakeWord(),
  counterKey: 'allLines',
}

export const props: Readonly<FastFiltersProps<string, Record<string, number>>> = {
  options: [option],
  counters: { [option.counterKey]: 1 },
  countersVisible: true,
  disabled: false,
  loading: false,
  value: undefined,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  FastFilters = 'fast-filters',
}
