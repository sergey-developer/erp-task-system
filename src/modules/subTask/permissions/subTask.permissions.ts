import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserRoleEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export enum SubTaskApiPermissionsEnum {
  CanRework = 'CanRework',
}

export const subTaskApiPermissions: UserPermissionConfig = {
  [UserRoleEnum.FirstLineSupport]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRoleEnum.Engineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRoleEnum.SeniorEngineer]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
  [UserRoleEnum.HeadOfDepartment]: [
    CRUDPermissionsEnum.CanCreate,
    CRUDPermissionsEnum.CanGetList,
    CRUDPermissionsEnum.CanDelete,
    SubTaskApiPermissionsEnum.CanRework,
  ],
}
