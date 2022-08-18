import { FormInstance } from 'antd'

import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'

import getFieldsErrors from './getFieldsErrors'

const handleSetFieldsErrors = <T extends object>(
  error: ErrorResponse<T>,
  setter: FormInstance['setFields'],
) => {
  if (error.status === HttpStatusCodeEnum.BadRequest) {
    setter(getFieldsErrors(error.data))
  }
}

export default handleSetFieldsErrors
