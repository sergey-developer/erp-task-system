import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskResolutionApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [PermissionsEnum.CanUpdate],
  [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanUpdate],
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanUpdate],
  [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanUpdate],
}
