import { useEffect } from 'react'

import { useUserPermissions } from 'modules/user/hooks'
import { workGroupApiPermissions } from 'modules/workGroup/permissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

import { GET_WORK_GROUP_LIST_SERVER_ERROR_MSG } from '../constants/errors'

export const useGetWorkGroupList = () => {
  const permissions = useUserPermissions(workGroupApiPermissions)

  const state = useGetWorkGroupListQuery(null, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG)
  }, [state.isError])

  return state
}
