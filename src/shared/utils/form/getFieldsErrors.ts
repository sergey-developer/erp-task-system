import { FieldData as BaseFieldData } from 'rc-field-form/es/interface'

import { Keys } from 'shared/interfaces/utils'
import { ErrorData } from 'shared/services/api'

type FieldData = Pick<BaseFieldData, 'name' | 'errors'>

const getFieldsErrors = <T extends ErrorData<T>>(data: T): Array<FieldData> => {
  return Object.keys(data).reduce<Array<FieldData>>((acc, key) => {
    const fieldName = key as Keys<T>
    const fieldValue = data[fieldName]

    if (fieldName !== 'detail' && fieldValue) {
      acc.push({
        name: fieldName as string,
        errors: fieldValue,
      })
    }

    return acc
  }, [])
}

export default getFieldsErrors
