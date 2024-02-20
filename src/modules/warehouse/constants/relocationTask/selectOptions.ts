import { SelectProps } from 'antd'

import {
  externalRelocationStatusDict,
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from './dict'

export const relocationTaskStatusOptions: SelectProps['options'] = Object.keys(
  relocationTaskStatusDict,
).map((key) => ({
  label: relocationTaskStatusDict[key as keyof typeof relocationTaskStatusDict],
  value: key,
}))

export const relocationTaskTypeOptions: SelectProps['options'] = Object.keys(
  relocationTaskTypeDict,
).map((key) => ({
  label: relocationTaskTypeDict[key as keyof typeof relocationTaskTypeDict],
  value: key,
}))

export const externalRelocationStatusOptions: SelectProps['options'] = Object.keys(
  externalRelocationStatusDict,
).map((key) => ({
  label: externalRelocationStatusDict[key as keyof typeof externalRelocationStatusDict],
  value: key,
}))
