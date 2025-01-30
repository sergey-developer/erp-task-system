import { FastFilterOptionProps } from 'features/task/components/FastFilters/FastFilterOption'

import { fakeWord } from '_tests_/utils'

export const filterCheckedClass = 'ant-tag-checkable-checked'
export const filterDisabledClass = 'ant-tag-checkable--disabled'

export const props: Readonly<
  Pick<FastFilterOptionProps, 'label' | 'checked' | 'counter' | 'value'>
> = {
  label: fakeWord(),
  value: fakeWord(),
  counter: 1,
  checked: false,
}

export enum TestIdsEnum {
  FastFiltersOption = 'fast-filters-option',
  FastFiltersOptionCounterLoading = 'fast-filters-option-counter-loading',
}
