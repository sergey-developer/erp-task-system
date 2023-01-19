import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskSuspendRequestApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanDelete,
  ],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanCreate],
  [UserRoleEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanDelete,
  ],
  [UserRoleEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanDelete,
  ],
}
