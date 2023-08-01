import { UserRoleEnum } from 'modules/user/constants'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/types/permissions'

export const taskCountersApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
}
