import { useMemo } from 'react'

import useUserInfo from 'modules/auth/hooks/useUserInfo'
import UserRolesEnum from 'shared/constants/roles'

type UserRoleKey = `is${keyof typeof UserRolesEnum}Role`
type UseUserRoleResult = Record<UserRoleKey, boolean>

const useUserRole = (): UseUserRoleResult => {
  const userInfo = useUserInfo()

  return useMemo(
    () => ({
      isFirstLineSupportRole: userInfo?.role === UserRolesEnum.FirstLineSupport,
      isEngineerRole: userInfo?.role === UserRolesEnum.Engineer,
      isSeniorEngineerRole: userInfo?.role === UserRolesEnum.SeniorEngineer,
      isHeadOfDepartmentRole: userInfo?.role === UserRolesEnum.HeadOfDepartment,
      isAdminRole: userInfo?.role === UserRolesEnum.Admin,
    }),
    [userInfo?.role],
  )
}

export default useUserRole
