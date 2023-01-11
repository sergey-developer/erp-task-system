import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskCountersApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
}
