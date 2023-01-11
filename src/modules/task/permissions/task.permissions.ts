import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

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
