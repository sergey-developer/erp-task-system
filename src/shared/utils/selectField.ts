import { CheckboxOptionType } from 'antd/lib/checkbox/Group'
import { DefaultOptionType, FieldNames } from 'rc-select/lib/Select'

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

export const makeSelectOption = <T extends { title: string; id: number | string }>(value: T) => ({
  label: value.title,
  value: value.id,
})

export const makeSelectOptions = <T extends { title: string; id: number | string }[]>(
  arr: T,
): DefaultOptionType[] => arr.map((item) => makeSelectOption(item))
