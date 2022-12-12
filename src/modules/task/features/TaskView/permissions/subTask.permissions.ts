import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export enum SubTaskApiPermissionsEnum {
  CanRework = 'CanRework',
}

export const subTaskApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRolesEnum.Engineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRolesEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRolesEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
}
