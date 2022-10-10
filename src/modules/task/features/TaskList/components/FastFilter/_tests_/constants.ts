import { FilterTagProps } from '../FilterTag'
import { FastFilterProps } from '../interfaces'

export const filterCheckedClass = 'ant-tag-checkable-checked'

export const filterTagRequiredProps: Readonly<
  Pick<FilterTagProps, 'text' | 'checked' | 'amount'>
> = {
  text: 'text',
  amount: 0,
  checked: false,
}

export const filterRequiredProps: Readonly<FastFilterProps> = {
  data: { all: 1, closed: 2, free: 3, mine: 4, overdue: 5 },
  isError: false,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}
