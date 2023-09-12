import { FormInstance } from 'antd'

import { ErrorResponse } from 'shared/services/baseApi'

import { getFieldsErrors } from './getFieldsErrors'

export const handleSetFieldsErrors = <T extends ErrorResponse>(
  error: T,
  setter: FormInstance['setFields'],
) => {
  setter(getFieldsErrors(error.data))
}
