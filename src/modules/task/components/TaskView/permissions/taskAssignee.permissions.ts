import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskAssigneePermissions: ObjectPermissionConfig<'select'> = {
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
}

export const taskAssigneeApiPermissions: ObjectPermissionConfig<'update'> = {
  update: {
    [UserRolesEnum.Engineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanUpdate],
  },
}
