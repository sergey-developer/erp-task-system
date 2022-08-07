import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

const assigneePermissions: ObjectPermissionConfig<'select' | 'update'> = {
  select: {
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
  update: {
    [UserRolesEnum.Engineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanUpdate],
  },
}

export default assigneePermissions
