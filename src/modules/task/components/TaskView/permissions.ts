import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ElementPermissionConfig } from 'shared/interfaces/permissions'

const permissions: ElementPermissionConfig<'assignee'> = {
  assignee: {
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
  },
}

export default permissions
