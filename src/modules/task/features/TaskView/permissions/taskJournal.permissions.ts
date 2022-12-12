import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskJournalApiPermissions: ObjectPermissionConfig<'list' | 'csv'> =
  {
    list: {
      [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGetList],
      [UserRolesEnum.Engineer]: [PermissionsEnum.CanGetList],
      [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGetList],
      [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGetList],
    },
    csv: {
      [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
      [UserRolesEnum.Engineer]: [PermissionsEnum.CanGet],
      [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
      [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
    },
  }
