import { useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

type UserRoleKey = `is${Keys<typeof UserRolesEnum>}Role`
type UseUserRoleResult = BooleanMap<UserRoleKey>

const useUserRole = (): UseUserRoleResult => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      isFirstLineSupportRole: role === UserRolesEnum.FirstLineSupport,
      isEngineerRole: role === UserRolesEnum.Engineer,
      isSeniorEngineerRole: role === UserRolesEnum.SeniorEngineer,
      isHeadOfDepartmentRole: role === UserRolesEnum.HeadOfDepartment,
      isAdminRole: role === UserRolesEnum.Admin,
    }
  }, [user?.role])
}

export default useUserRole
