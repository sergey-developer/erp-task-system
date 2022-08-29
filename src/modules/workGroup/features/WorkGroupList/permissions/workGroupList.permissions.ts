import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const workGroupListApiPermissions: ObjectPermissionConfig<'getList'> = {
  getList: {
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
  },
}
