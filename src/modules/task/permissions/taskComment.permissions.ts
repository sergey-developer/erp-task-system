import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskCommentApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.Engineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
  ],
}
