import { FormInstance } from 'antd'

import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'
import { isEqual } from 'shared/utils/common/isEqual'

import getFieldsErrors from './getFieldsErrors'

const handleSetFieldsErrors = <T extends ErrorResponse>(
  error: T,
  setter: FormInstance['setFields'],
) => {
  if (isEqual(error.status, HttpStatusCodeEnum.BadRequest)) {
    setter(getFieldsErrors(error.data))
  }
}

export default handleSetFieldsErrors
