import { FilterTagProps } from '../FilterTag'

export const requiredProps: Pick<
  FilterTagProps,
  'text' | 'checked' | 'amount'
> = {
  text: 'text',
  amount: 1,
  checked: false,
}

export const filterCheckedClass = 'ant-tag-checkable-checked'
