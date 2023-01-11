import { UIPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const extendedFilterPermissions: ObjectPermissionConfig<'workGroup'> = {
  workGroup: {
    [UserRoleEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
}
