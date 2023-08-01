import { UserRoleEnum } from 'modules/user/constants'

import { UIPermissionsEnum } from 'shared/constants/permissions'
import { ObjectPermissionConfig } from 'shared/types/permissions'

export const extendedFilterPermissions: ObjectPermissionConfig<'workGroup'> = {
  workGroup: {
    [UserRoleEnum.SeniorEngineer]: [UIPermissionsEnum.CanView],
    [UserRoleEnum.HeadOfDepartment]: [UIPermissionsEnum.CanView],
  },
}
