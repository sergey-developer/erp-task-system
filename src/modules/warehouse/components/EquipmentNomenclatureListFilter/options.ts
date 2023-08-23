import { SelectProps } from 'antd'

import { equipmentConditionDict } from 'modules/warehouse/constants'

export const conditionOptions: SelectProps['options'] = Object.keys(
  equipmentConditionDict,
).map((key) => ({
  label: equipmentConditionDict[key as keyof typeof equipmentConditionDict],
  value: key,
}))
