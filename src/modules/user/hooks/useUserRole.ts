import { useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import { AuthenticatedUser } from 'modules/auth/interfaces'
import UserRolesEnum from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'

type UserRoleKey = `is${keyof typeof UserRolesEnum}Role`
type UseUserRoleResult = Record<UserRoleKey, boolean> & {
  role: MaybeNull<AuthenticatedUser['userRole']>
}

const useUserRole = (): UseUserRoleResult => {
  const user = useAuthenticatedUser()

  return useMemo(
    () => ({
      role: user?.role || null,
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
