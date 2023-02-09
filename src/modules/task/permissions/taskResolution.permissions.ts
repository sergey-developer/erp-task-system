import { UserRoleEnum } from 'modules/user/constants/roles'
import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskResolutionApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
