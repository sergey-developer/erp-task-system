import { UserRoleEnum } from 'modules/user/constants'

import { CRUDPermissionsEnum } from 'shared/constants/permissions'
import { UserPermissionConfig } from 'shared/types/permissions'

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
