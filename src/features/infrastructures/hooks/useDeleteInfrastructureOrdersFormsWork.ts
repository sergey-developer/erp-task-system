import { deleteInfrastructureOrdersFormsWorkErrMsg } from 'features/infrastructures/api/constants'
import { useDeleteInfrastructureOrdersFormsWorkMutation } from 'features/infrastructures/api/infrastructures.endpoints'
import {
  DeleteInfrastructureOrdersFormsWorkMutationArgs,
  DeleteInfrastructureOrdersFormsWorkSuccessResponse,
} from 'features/infrastructures/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteInfrastructureOrdersFormsWorkResult = CustomUseMutationResult<
  DeleteInfrastructureOrdersFormsWorkMutationArgs,
  DeleteInfrastructureOrdersFormsWorkSuccessResponse
>

export const useDeleteInfrastructureOrdersFormsWork =
  (): UseDeleteInfrastructureOrdersFormsWorkResult => {
    const [mutation, state] = useDeleteInfrastructureOrdersFormsWorkMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(deleteInfrastructureOrdersFormsWorkErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
