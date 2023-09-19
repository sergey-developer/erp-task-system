import { CheckboxOptionType } from 'antd/lib/checkbox/Group'
import { FieldNames } from 'rc-select/lib/Select'

export const idAndTitleSelectFieldNames: Readonly<
  Pick<FieldNames, 'label' | 'value'>
> = {
  label: 'title',
  value: 'id',
}

export const idAndNameSelectFieldNames: Readonly<
  Pick<FieldNames, 'label' | 'value'>
> = {
  label: 'name',
  value: 'id',
}

export const yesNoOptions: NonNullable<CheckboxOptionType[]> = [
  {
    label: 'Да',
    value: true,
  },
  {
    label: 'Нет',
    value: false,
  },
]
