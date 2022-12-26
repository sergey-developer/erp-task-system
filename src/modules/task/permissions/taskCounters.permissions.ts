import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskCountersApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
  [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
  [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
}
