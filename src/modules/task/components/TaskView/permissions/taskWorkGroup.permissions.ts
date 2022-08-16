import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import {
  ObjectPermissionConfig,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'

export const taskWorkGroupPermissions: ObjectPermissionConfig<
  'transferSecondLineBtn' | 'transferFirstLineBtn'
> = {
  transferFirstLineBtn: {
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanView],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanView],
  },
  transferSecondLineBtn: {
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanView],
  },
}

export const taskWorkGroupApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanUpdate],
}
