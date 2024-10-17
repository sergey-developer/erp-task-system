import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteInfrastructureOrdersFormsWorkErrMsg } from 'modules/infrastructures/constants'
import {
  DeleteInfrastructureOrdersFormsWorkMutationArgs,
  DeleteInfrastructureOrdersFormsWorkSuccessResponse,
} from 'modules/infrastructures/models'
import { useDeleteInfrastructureOrdersFormsWorkMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
