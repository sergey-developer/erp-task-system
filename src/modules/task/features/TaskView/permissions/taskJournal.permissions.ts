import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskJournalApiPermissions: ObjectPermissionConfig<'list' | 'csv'> =
  {
    list: {
      [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGetList],
      [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanGetList],
      [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGetList],
      [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGetList],
    },
    csv: {
      [UserRolesEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
      [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
      [UserRolesEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
      [UserRolesEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
    },
  }
