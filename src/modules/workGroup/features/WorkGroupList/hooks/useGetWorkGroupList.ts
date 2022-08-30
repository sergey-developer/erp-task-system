import { useEffect } from 'react'

import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { workGroupListApiPermissions } from 'modules/workGroup/features/WorkGroupList/permissions/workGroupList.permissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { GET_WORK_GROUP_LIST_SERVER_ERROR_MSG } from '../constants/messages'

const useGetWorkGroupList = () => {
  const permissions = useUserPermissions(workGroupListApiPermissions.getList)

  const state = useGetWorkGroupListQuery(null, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG)
  }, [state.isError])

  return state
}

export default useGetWorkGroupList
