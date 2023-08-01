import { UserRoleEnum } from 'modules/user/constants/roles'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/types/permissions'

export const taskApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.Engineer]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRoleEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRoleEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRoleEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
}
