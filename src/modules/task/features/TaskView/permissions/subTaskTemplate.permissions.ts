import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const subTaskTemplateApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGetList],
  [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGetList],
}
