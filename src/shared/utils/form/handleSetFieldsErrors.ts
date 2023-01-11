import { FormInstance } from 'antd'

import { ErrorResponse, isBadRequestError } from 'shared/services/api'

import { getFieldsErrors } from './getFieldsErrors'

export const handleSetFieldsErrors = <T extends ErrorResponse>(
  error: T,
  setter: FormInstance['setFields'],
) => {
  if (isBadRequestError(error)) {
    setter(getFieldsErrors(error.data))
  }
}
