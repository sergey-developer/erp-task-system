import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/workGroupApi.service'

import { workGroupListApiPermissions } from '../permissions/workGroupList.permissions'

const useGetWorkGroupList = () => {
  const permissions = useUserPermissions(workGroupListApiPermissions.get)

  return useGetWorkGroupListQuery(null, {
    skip: !permissions.canGet,
  })
}

export default useGetWorkGroupList
