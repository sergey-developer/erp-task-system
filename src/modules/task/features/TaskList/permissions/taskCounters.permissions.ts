import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskCountersApiPermissions: ObjectPermissionConfig<'getCounters'> =
  {
    getCounters: {
      [UserRolesEnum.Engineer]: [PermissionsEnum.CanGet],
      [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
      [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
      [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
    },
  }
