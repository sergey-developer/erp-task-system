import { FieldData as BaseFieldData } from 'rc-field-form/es/interface'

import { FieldsErrors } from 'shared/api/services/baseApi'

type FieldData = Pick<BaseFieldData, 'name' | 'errors'>

export const getFieldsErrors = (data: FieldsErrors<{}>): FieldData[] => {
  return Object.keys(data).reduce<FieldData[]>((acc, key) => {
    const fieldName = key as keyof typeof data
    const fieldValue = data[fieldName]

    if (fieldValue) {
      acc.push({ name: fieldName as string, errors: fieldValue })
    }

    return acc
  }, [])
}
