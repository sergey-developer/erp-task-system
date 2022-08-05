import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'

const assigneePermissions = {
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanView],
  [UserRolesEnum.Engineer]: [PermissionsEnum.CanView],
  [UserRolesEnum.SeniorEngineer]: [
    PermissionsEnum.CanView,
    PermissionsEnum.CanEdit,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    PermissionsEnum.CanView,
    PermissionsEnum.CanEdit,
  ],
}

export default assigneePermissions
