import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

const workGroupPermissions: UserPermissionConfig = {
  [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanView],
  [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanView],
}

export default workGroupPermissions
