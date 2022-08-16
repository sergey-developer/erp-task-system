import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskReclassificationRequestApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGet,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGet,
  ],
  [UserRolesEnum.Engineer]: [PermissionsEnum.CanGet],
  [UserRolesEnum.HeadOfDepartment]: [
    PermissionsEnum.CanCreate,
    PermissionsEnum.CanGet,
  ],
}
