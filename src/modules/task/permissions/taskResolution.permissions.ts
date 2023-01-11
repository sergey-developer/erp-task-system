import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskResolutionApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
