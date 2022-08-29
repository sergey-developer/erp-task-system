import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { workgroupListApiPermissions } from 'modules/workgroup/features/WorkgroupList/permissions/workgroupList.permissions'
import { useGetWorkgroupListQuery } from 'modules/workgroup/services/workgroupApi.service'

const useGetWorkgroupList = () => {
  const permissions = useUserPermissions(workgroupListApiPermissions.getList)

  return useGetWorkgroupListQuery(null, {
    skip: !permissions.canGet,
  })
}

export default useGetWorkgroupList
