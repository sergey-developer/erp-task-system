import { UserRoleEnum } from 'modules/user/constants/roles'
import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskReclassificationRequestApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
  [UserRoleEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRoleEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
  [UserRoleEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
}
