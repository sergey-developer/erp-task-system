import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const subTaskApiPermissions: ObjectPermissionConfig<
  'subTask' | 'template'
> = {
  subTask: {
    [UserRolesEnum.FirstLineSupport]: [
      PermissionsEnum.CanCreate,
      PermissionsEnum.CanGetList,
    ],
    [UserRolesEnum.Engineer]: [
      PermissionsEnum.CanCreate,
      PermissionsEnum.CanGetList,
    ],
    [UserRolesEnum.SeniorEngineer]: [
      PermissionsEnum.CanCreate,
      PermissionsEnum.CanGetList,
    ],
    [UserRolesEnum.HeadOfDepartment]: [
      PermissionsEnum.CanCreate,
      PermissionsEnum.CanGetList,
    ],
  },
  template: {
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGetList],
    [UserRolesEnum.Engineer]: [PermissionsEnum.CanGetList],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGetList],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGetList],
  },
}
