import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'

const getTransferTaskSecondLineErrors = (
  error: ErrorResponse,
): Array<string> => {
  if (
    error.status === HttpStatusCodeEnum.NotFound ||
    error.status! >= HttpStatusCodeEnum.ServerError
  ) {
    return ['Возникла ошибка при назначении рабочей группы']
  }

  return getErrorDetail(error)
}

export default getTransferTaskSecondLineErrors
