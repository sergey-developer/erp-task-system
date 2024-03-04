import { UserRoleEnum } from 'modules/user/constants'

import { UserStatusModel } from 'shared/models/catalogs/userStatus'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type BaseUserModel = {
  id: IdType
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}

type NomenclatureUserPermissions =
  | 'NOMENCLATURES_READ'
  | 'NOMENCLATURES_CREATE'
  | 'NOMENCLATURES_DELETE'
  | 'NOMENCLATURES_UPDATE'

type NomenclatureGroupUserPermissions =
  | 'NOMENCLATURE_GROUPS_READ'
  | 'NOMENCLATURE_GROUPS_CREATE'
  | 'NOMENCLATURE_GROUPS_DELETE'
  | 'NOMENCLATURE_GROUPS_UPDATE'

type EquipmentUserPermissions =
  | 'EQUIPMENTS_READ'
  | 'EQUIPMENTS_CREATE'
  | 'EQUIPMENTS_DELETE'
  | 'EQUIPMENTS_UPDATE'

type RelocationTaskUserPermissions =
  | 'RELOCATION_TASKS_READ'
  | 'RELOCATION_TASKS_CREATE'
  | 'RELOCATION_TASKS_UPDATE'

type WarehouseReportsUserPermissions = 'WAREHOUSE_REPORTS_READ'

// todo: переделать на enum
export type UserPermissions =
  | NomenclatureUserPermissions
  | NomenclatureGroupUserPermissions
  | EquipmentUserPermissions
  | RelocationTaskUserPermissions
  | WarehouseReportsUserPermissions
  | 'TASK_INTERNAL_DESCRIPTION_UPDATE'
  | 'TASK_HISTORY_DESCRIPTION_READ'
  | 'TASK_HISTORY_DEADLINE_READ'
  | 'TASK_INTERNAL_DEADLINE_UPDATE'
  | 'ENTERING_BALANCES'

export type UserModel = BaseUserModel & {
  fullName: string
  role: UserRoleEnum
  email: string
  timezone: string
  isStaff: boolean
  phone: MaybeNull<string>
  status: UserStatusModel
  permissions: UserPermissions[]
}
