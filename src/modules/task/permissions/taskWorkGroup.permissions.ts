import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskWorkGroupPermissions: ObjectPermissionConfig<
  'transferSecondLineBtn' | 'transferFirstLineBtn'
> = {
  transferFirstLineBtn: {
    [UserRoleEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
  transferSecondLineBtn: {
    [UserRoleEnum.FirstLineSupport]: [UIPermissionsEnum.CanView],
  },
}

export const taskWorkGroupApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanDelete],
}
