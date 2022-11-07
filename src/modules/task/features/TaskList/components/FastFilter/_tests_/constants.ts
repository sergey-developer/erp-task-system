import { generateWord } from '_tests_/utils'

import { FastFilterEnum } from '../../../constants/common'
import { FilterTagProps } from '../FilterTag'
import { FastFilterProps } from '../interfaces'

export const filterTagRequiredProps: Readonly<
  Pick<FilterTagProps, 'text' | 'checked' | 'amount' | 'value'>
> = {
  text: generateWord(),
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}

export const filterCheckedClass = 'ant-tag-checkable-checked'
export const filterDisabledClass = 'ant-tag-checkable--disabled'

export const filterRequiredProps: Readonly<FastFilterProps> = {
  data: { all: 1, closed: 2, free: 3, mine: 4, overdue: 5 },
  isError: false,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}
