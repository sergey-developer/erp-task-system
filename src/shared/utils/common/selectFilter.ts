import { SelectProps } from 'antd'
import isString from 'lodash/isString'

export const filterOptionBy =
  (optionKey: string): SelectProps<any, any>['filterOption'] =>
  (input, option) => {
    if (!option || option.options) return false

    return isString(option[optionKey])
      ? option[optionKey].toLowerCase().includes(input.toLowerCase())
      : false
  }
