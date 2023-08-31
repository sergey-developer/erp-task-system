import { UserRoleEnum } from 'modules/user/constants'

import { MaybeNull } from 'shared/types/utils'

import { UserStatusModel } from './userStatus.model'

export type BaseUserModel = {
  id: number
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}

// todo: разместить по модулям
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

export type UserPermissions =
  | NomenclatureUserPermissions
  | NomenclatureGroupUserPermissions
  | EquipmentUserPermissions

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
