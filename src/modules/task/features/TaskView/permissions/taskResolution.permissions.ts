import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskResolutionApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
