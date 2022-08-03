import { HttpStatusCodeEnum } from 'shared/constants/http'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

const getTransferTaskSecondLineError = (
  error: ErrorResponse,
): MaybeNull<string> => {
  if (
    error.status === HttpStatusCodeEnum.NotFound ||
    error.status! >= HttpStatusCodeEnum.ServerError
  ) {
    return 'Возникла ошибка при назначении рабочей группы'
  }

  return null
}

export default getTransferTaskSecondLineError
