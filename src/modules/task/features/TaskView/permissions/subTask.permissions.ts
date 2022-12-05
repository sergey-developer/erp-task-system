import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const subTaskApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
    PermissionsEnum.CanDelete,
  ],
  [UserRolesEnum.Engineer]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
    PermissionsEnum.CanDelete,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
    PermissionsEnum.CanDelete,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
    PermissionsEnum.CanDelete,
  ],
}
