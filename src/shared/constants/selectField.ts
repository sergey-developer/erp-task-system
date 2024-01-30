import { getBooleanOptions, getSelectFieldNames } from 'shared/utils/selectField'

export const idAndTitleSelectFieldNames = getSelectFieldNames('title')
export const idAndNameSelectFieldNames = getSelectFieldNames('name')
export const idAndFullNameSelectFieldNames = getSelectFieldNames('fullName')
export const yesNoOptions = getBooleanOptions()
