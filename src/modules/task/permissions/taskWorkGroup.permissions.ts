import { UserRoleEnum } from 'modules/user/constants'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/types/permissions'

export const taskWorkGroupApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanDelete, CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanDelete],
}
