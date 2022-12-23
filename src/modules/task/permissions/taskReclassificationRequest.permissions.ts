import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskReclassificationRequestApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
  [UserRolesEnum.Engineer]: [CRUDPermissionsEnum.CanGet],
  [UserRolesEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGet,
  ],
}
