import { DefaultOptionType } from 'rc-select/lib/Select'

import { getBooleanOptions, getSelectFieldNames } from 'shared/utils/selectField'

export const idAndTitleSelectFieldNames = getSelectFieldNames('title')
export const idAndNameSelectFieldNames = getSelectFieldNames('name')
export const idAndFullNameSelectFieldNames = getSelectFieldNames('fullName')
export const yesNoOptions = getBooleanOptions()

export const undefinedSelectOption: Pick<DefaultOptionType, 'label'> & { value: number } = {
  label: 'Не определено',
  value: -1,
}
