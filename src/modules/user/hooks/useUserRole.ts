import { useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import UserRolesEnum from 'shared/constants/roles'

type UserRoleKey = `is${keyof typeof UserRolesEnum}Role`
type UseUserRoleResult = Record<UserRoleKey, boolean>

const useUserRole = (): UseUserRoleResult => {
  const user = useAuthenticatedUser()

  return useMemo(
    () => ({
      isFirstLineSupportRole: user?.role === UserRolesEnum.FirstLineSupport,
      isEngineerRole: user?.role === UserRolesEnum.Engineer,
      isSeniorEngineerRole: user?.role === UserRolesEnum.SeniorEngineer,
      isHeadOfDepartmentRole: user?.role === UserRolesEnum.HeadOfDepartment,
      isAdminRole: user?.role === UserRolesEnum.Admin,
    }),
    [user?.role],
  )
}

export default useUserRole
