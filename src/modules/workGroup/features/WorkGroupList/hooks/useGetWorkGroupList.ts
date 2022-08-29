import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { workGroupListApiPermissions } from 'modules/workGroup/features/WorkGroupList/permissions/workGroupList.permissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'

const useGetWorkGroupList = () => {
  const permissions = useUserPermissions(workGroupListApiPermissions.getList)

  return useGetWorkGroupListQuery(null, {
    skip: !permissions.canGet,
  })
}

export default useGetWorkGroupList
