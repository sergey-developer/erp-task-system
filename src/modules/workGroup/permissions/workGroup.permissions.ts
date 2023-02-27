import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const workGroupApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGetList],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGetList],
}
