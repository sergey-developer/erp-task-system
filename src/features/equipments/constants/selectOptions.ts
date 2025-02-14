import { SelectProps } from 'antd'

import { equipmentConditionDict } from './dict'

export const equipmentConditionOptions: SelectProps['options'] = Object.keys(
  equipmentConditionDict,
).map((key) => ({
  label: equipmentConditionDict[key as keyof typeof equipmentConditionDict],
  value: key,
}))
