import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskAssigneePermissions: ObjectPermissionConfig<'select'> = {
  select: {
    [UserRolesEnum.FirstLineSupport]: [UIPermissionsEnum.CanView],
    [UserRolesEnum.Engineer]: [UIPermissionsEnum.CanView],
    [UserRolesEnum.SeniorEngineer]: [
      UIPermissionsEnum.CanView,
      UIPermissionsEnum.CanEdit,
    ],
    [UserRolesEnum.HeadOfDepartment]: [
      UIPermissionsEnum.CanView,
      UIPermissionsEnum.CanEdit,
    ],
  },
}

export const taskAssigneeApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
