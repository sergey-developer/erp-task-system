import { generateWord } from '_tests_/utils'
import taskFixtures from 'fixtures/task'

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
  data: taskFixtures.getGetTaskCountersResponse(),
  isError: false,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}
