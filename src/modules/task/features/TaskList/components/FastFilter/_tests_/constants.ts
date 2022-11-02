import { FastFilterEnum } from '../../../constants/common'
import { FilterTagProps } from '../FilterTag'

export const requiredProps: Pick<
  FilterTagProps,
  'text' | 'checked' | 'amount' | 'value'
> = {
  text: 'text',
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}

export const filterCheckedClass = 'ant-tag-checkable-checked'
export const filterDisabledClass = 'ant-tag-checkable--disabled'
