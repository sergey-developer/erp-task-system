import { useMemo } from 'react'

import useUserInfo from 'modules/auth/hooks/useUserInfo'
import UserRolesEnum from 'shared/constants/roles'

type UseUserRoleResult = Record<
  | 'isFirstLineSupportRole'
  | 'isEngineerRole'
  | 'isSeniorEngineerRole'
  | 'isHeadOfDepartmentRole'
  | 'isAdminRole',
  boolean
>

const useUserRole = (): UseUserRoleResult => {
  const { role } = useUserInfo()

  return useMemo(
    () => ({
      isFirstLineSupportRole: role === UserRolesEnum.FirstLineSupport,
      isEngineerRole: role === UserRolesEnum.Engineer,
      isSeniorEngineerRole: role === UserRolesEnum.SeniorEngineer,
      isHeadOfDepartmentRole: role === UserRolesEnum.HeadOfDepartment,
      isAdminRole: role === UserRolesEnum.Admin,
    }),
    [role],
  )
}

export default useUserRole
