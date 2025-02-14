import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getNomenclaturesGroupsErrorMessage } from '../api/constants'
import { useGetNomenclaturesGroupsQuery } from '../api/endpoints/nomenclaturesGroups.endpoints'
import { GetNomenclaturesGroupsRequest, GetNomenclaturesGroupsResponse } from '../api/schemas'

type UseGetNomenclaturesGroupsResult = CustomUseQueryHookResult<
  GetNomenclaturesGroupsRequest,
  GetNomenclaturesGroupsResponse
>

type UseGetNomenclaturesGroupsOptions = CustomUseQueryOptions<
  GetNomenclaturesGroupsRequest,
  GetNomenclaturesGroupsResponse
>

export const useGetNomenclaturesGroups = (
  args?: GetNomenclaturesGroupsRequest,
  options?: UseGetNomenclaturesGroupsOptions,
): UseGetNomenclaturesGroupsResult => {
  const state = useGetNomenclaturesGroupsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getNomenclaturesGroupsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
