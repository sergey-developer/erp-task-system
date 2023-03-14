import { UserRoleEnum } from 'modules/user/constants/roles'
import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskCountersApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
}
