import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'

const getTransferTaskSecondLineError = (error: ErrorResponse): string => {
  if (
    error.status === HttpStatusCodeEnum.NotFound ||
    error.status! >= HttpStatusCodeEnum.ServerError
  ) {
    return 'Возникла ошибка при назначении рабочей группы'
  }

  return getErrorDetail(error)
}

export default getTransferTaskSecondLineError
