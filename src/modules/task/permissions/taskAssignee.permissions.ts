import { UserRoleEnum } from 'modules/user/constants'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/types/permissions'

export const taskAssigneeApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
