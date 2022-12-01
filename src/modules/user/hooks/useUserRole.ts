import { useMemo } from 'react'

import { useAuthenticatedUser } from 'modules/auth/hooks'
import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const useUserRole = (): BooleanMap<`is${keyof typeof UserRolesEnum}Role`> => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      isFirstLineSupportRole: isEqual(role, UserRolesEnum.FirstLineSupport),
      isEngineerRole: isEqual(role, UserRolesEnum.Engineer),
      isSeniorEngineerRole: isEqual(role, UserRolesEnum.SeniorEngineer),
      isHeadOfDepartmentRole: isEqual(role, UserRolesEnum.HeadOfDepartment),
      isAdminRole: isEqual(role, UserRolesEnum.Admin),
    }
  }, [user?.role])
}

export default useUserRole
