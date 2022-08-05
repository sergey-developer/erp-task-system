import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

const workGroupPermissions: ObjectPermissionConfig<
  'transferSecondLine' | 'transferFirstLine'
> = {
  transferFirstLine: {
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanView],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanView],
  },
  transferSecondLine: {
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanView],
  },
}

export default workGroupPermissions
