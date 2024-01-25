import { CheckboxOptionType } from 'antd/lib/checkbox/Group'
import { FieldNames } from 'rc-select/lib/Select'

export const getBooleanOptions = (
  truthyText: string = 'Да',
  falsyText: string = 'Нет',
): NonNullable<CheckboxOptionType[]> => [
  {
    label: truthyText,
    value: true,
  },
  {
    label: falsyText,
    value: false,
  },
]

export const getSelectFieldNames = (
  labelPropName: string,
  valuePropName: string = 'id',
): Readonly<Pick<FieldNames, 'label' | 'value'>> => ({ label: labelPropName, value: valuePropName })
