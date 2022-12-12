import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanGet,
    CRUDPermissionsEnum.CanGetList,
  ],
}
