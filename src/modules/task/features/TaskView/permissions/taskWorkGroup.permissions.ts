import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskWorkGroupPermissions: ObjectPermissionConfig<
  'transferSecondLineBtn' | 'transferFirstLineBtn'
> = {
  transferFirstLineBtn: {
    [UserRolesEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRolesEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
  transferSecondLineBtn: {
    [UserRolesEnum.FirstLineSupport]: [UIPermissionsEnum.CanView],
  },
}

export const taskWorkGroupApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanUpdate],
  [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanDelete],
  [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanDelete],
}
