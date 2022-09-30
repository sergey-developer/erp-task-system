import { FastFilterItemProps } from '../FastFilterItem'

export const requiredProps: Pick<
  FastFilterItemProps,
  'text' | 'checked' | 'amount'
> = {
  text: 'text',
  amount: 0,
  checked: false,
}

export const filterCheckedClass = 'ant-tag-checkable-checked'
