import { UserRoleEnum } from 'modules/user/constants/roles'
import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const workGroupApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGetList],
}
