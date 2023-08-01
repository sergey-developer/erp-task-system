import { UserRoleEnum } from 'modules/user/constants/roles'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskJournalApiPermissions: ObjectPermissionConfig<'list' | 'csv'> =
  {
    list: {
      [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGetList],
      [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGetList],
      [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGetList],
      [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGetList],
    },
    csv: {
      [UserRoleEnum.FirstLineSupport]: [CRUDPermissionsEnum.CanGet],
      [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
      [UserRoleEnum.SeniorEngineer]: [CRUDPermissionsEnum.CanGet],
      [UserRoleEnum.HeadOfDepartment]: [CRUDPermissionsEnum.CanGet],
    },
  }
