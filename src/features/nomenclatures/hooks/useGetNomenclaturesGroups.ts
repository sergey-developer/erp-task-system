import { useGetNomenclaturesGroupsQuery } from 'features/nomenclatures/api/endpoints/nomenclaturesGroups.endpoints'
import {
  GetNomenclaturesGroupsRequest,
  GetNomenclaturesGroupsResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getNomenclaturesGroupsErrMsg } from '../api/constants'

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
        showErrorNotification(getNomenclaturesGroupsErrMsg)
      }
    }
  }, [state.error])

  return state
}
