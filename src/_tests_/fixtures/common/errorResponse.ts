import { HttpCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/api/services/baseApi'

export const errorResponse = <Errors extends object = {}>(
  props: Pick<ErrorResponse, 'status'> &
    Partial<Pick<ErrorResponse<Errors>, 'data'>>,
): ErrorResponse<Errors> => ({
  status: props.status,
  data: props.data || {},
})

export const notFoundErrorResponse = <Errors extends object = {}>(
  data?: ErrorResponse<Errors>['data'],
) => errorResponse<Errors>({ status: HttpCodeEnum.NotFound, data })

export const serverErrorResponse = <Errors extends object = {}>(
  data?: ErrorResponse<Errors>['data'],
) => errorResponse<Errors>({ status: HttpCodeEnum.ServerError, data })
