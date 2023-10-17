import { SelectProps } from 'antd'
import isString from 'lodash/isString'

// todo: переиспользовать в других местах
export const filterOption =
  (optionKey: string): SelectProps<any, any>['filterOption'] =>
  (input, option) =>
    option && isString(option[optionKey])
      ? option[optionKey].toLowerCase().includes(input.toLowerCase())
      : false
