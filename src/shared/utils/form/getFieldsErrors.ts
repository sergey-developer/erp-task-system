import omit from 'lodash/omit'
import { FieldData as BaseFieldData } from 'rc-field-form/es/interface'

import { ErrorData } from 'shared/services/baseApi'

type FieldData = Pick<BaseFieldData, 'name' | 'errors'>

export const getFieldsErrors = (data: ErrorData): FieldData[] => {
  const dataCopy = omit({ ...data }, 'detail')

  return Object.keys(dataCopy).reduce<FieldData[]>((acc, key) => {
    const fieldName = key as keyof typeof dataCopy
    const fieldValue = dataCopy[fieldName]

    if (fieldValue) {
      acc.push({
        name: fieldName as string,
        errors: fieldValue,
      })
    }

    return acc
  }, [])
}
