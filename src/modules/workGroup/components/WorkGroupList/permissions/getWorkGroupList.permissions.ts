import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

const getWorkGroupListPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
  [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
  [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
}

export default getWorkGroupListPermissions
