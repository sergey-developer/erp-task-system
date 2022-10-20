import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskCommentApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.Engineer]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGetList,
  ],
}
