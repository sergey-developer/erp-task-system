import { deleteInfrastructureOrdersFormsWorkErrorMessage } from 'features/infrastructures/api/constants'
import { useDeleteInfrastructureOrdersFormsWorkMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import {
  DeleteInfrastructureOrdersFormsWorkRequest,
  DeleteInfrastructureOrdersFormsWorkResponse,
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
  DeleteInfrastructureOrdersFormsWorkRequest,
  DeleteInfrastructureOrdersFormsWorkResponse
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
          showErrorNotification(deleteInfrastructureOrdersFormsWorkErrorMessage)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
