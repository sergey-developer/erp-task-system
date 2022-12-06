import { UIPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const extendedFilterPermissions: ObjectPermissionConfig<'workGroup'> = {
  workGroup: {
    [UserRolesEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRolesEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
}
