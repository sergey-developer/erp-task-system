import { UserRoleEnum } from 'modules/user/constants/roles'

import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskWorkGroupPermissions: ObjectPermissionConfig<
  'transferToSecondLineBtn' | 'transferToFirstLineBtn'
> = {
  transferToFirstLineBtn: {
    [UserRoleEnum.Engineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
  transferToSecondLineBtn: {
    [UserRoleEnum.FirstLineSupport]: [UIPermissionsEnum.CanView],
  },
}

export const taskWorkGroupApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanDelete],
}
