import { UserRoleEnum } from 'modules/user/constants/roles'

import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskAssigneePermissions: ObjectPermissionConfig<'select'> = {
  select: {
    [UserRoleEnum.FirstLineSupport]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.Engineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.SeniorEngineer]: [
      UIPermissionsEnum.CanView,
      UIPermissionsEnum.CanEdit,
    ],
    [UserRoleEnum.HeadOfDepartment]: [
      UIPermissionsEnum.CanView,
      UIPermissionsEnum.CanEdit,
    ],
  },
}

export const taskAssigneeApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanUpdate],
}
