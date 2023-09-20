import { SelectProps } from 'antd'

import { relocationTaskStatusDict } from './dict'

export const statusOptions: SelectProps['options'] = Object.keys(relocationTaskStatusDict).map(
  (key) => ({
    label: relocationTaskStatusDict[key as keyof typeof relocationTaskStatusDict],
    value: key,
  }),
)
