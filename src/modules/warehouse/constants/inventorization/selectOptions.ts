import { SelectProps } from 'antd'

import { inventorizationStatusDict, inventorizationTypeDict } from './dict'

export const inventorizationStatusOptions: SelectProps['options'] = Object.keys(
  inventorizationStatusDict,
).map((key) => ({
  label: inventorizationStatusDict[key as keyof typeof inventorizationStatusDict],
  value: key,
}))

export const inventorizationTypeOptions: SelectProps['options'] = Object.keys(
  inventorizationTypeDict,
).map((key) => ({
  label: inventorizationTypeDict[key as keyof typeof inventorizationTypeDict],
  value: key,
}))
