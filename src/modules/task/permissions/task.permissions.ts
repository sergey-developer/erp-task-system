import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [
    PermissionsEnum.CanGet,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    PermissionsEnum.CanGet,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.FirstLineSupport]: [
    PermissionsEnum.CanGet,
    PermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    PermissionsEnum.CanGet,
    PermissionsEnum.CanGetList,
  ],
}
