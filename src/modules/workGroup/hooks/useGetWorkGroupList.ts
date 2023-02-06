import { useEffect } from 'react'

import { useUserPermissions } from 'modules/user/hooks'
import { GET_WORK_GROUP_LIST_SERVER_ERROR_MSG } from 'modules/workGroup/constants/errors'
import { GetWorkGroupListQueryArgs } from 'modules/workGroup/models'
import { workGroupApiPermissions } from 'modules/workGroup/permissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetWorkGroupList = (args?: GetWorkGroupListQueryArgs) => {
  const permissions = useUserPermissions(workGroupApiPermissions)

  const state = useGetWorkGroupListQuery(args, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG)
  }, [state.isError])

  return state
}
