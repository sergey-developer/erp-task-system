import { UserRoleEnum } from 'modules/user/constants/roles'
import { UIPermissionsEnum } from 'shared/constants/permissions'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const extendedFilterPermissions: ObjectPermissionConfig<'workGroup'> = {
  workGroup: {
    [UserRoleEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
}
