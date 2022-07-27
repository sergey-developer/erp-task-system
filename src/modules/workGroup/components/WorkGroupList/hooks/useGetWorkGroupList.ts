import useUserRole from 'modules/user/hooks/useUserRole'
import { useGetWorkGroupListQuery } from 'modules/workGroup/workGroupApi.service'

const useGetWorkGroupList = () => {
  const {
    isFirstLineSupportRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const shouldSkip: boolean = !(
    isFirstLineSupportRole ||
    isSeniorEngineerRole ||
    isHeadOfDepartmentRole
  )

  return useGetWorkGroupListQuery(null, {
    skip: shouldSkip,
  })
}

export default useGetWorkGroupList
