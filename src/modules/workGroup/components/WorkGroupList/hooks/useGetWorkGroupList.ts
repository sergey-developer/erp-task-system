import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/workGroupApi.service'

import getWorkGroupListPermissions from '../permissions/getWorkGroupList.permissions'

const useGetWorkGroupList = () => {
  const permissions = useUserPermissions(getWorkGroupListPermissions)

  return useGetWorkGroupListQuery(null, {
    skip: !permissions.canGet,
  })
}

export default useGetWorkGroupList
