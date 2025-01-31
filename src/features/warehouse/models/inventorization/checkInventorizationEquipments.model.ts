import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'

import { TableRowsApiErrors } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type CheckInventorizationEquipmentsMutationArgs = {
  inventorization: IdType
  equipments: {
    row: number
    title: string
    nomenclature: IdType
    category: IdType
    purpose: IdType
    condition: EquipmentConditionEnum
    quantityFact?: number
    comment?: string
    serialNumber?: string
    inventoryNumber?: string
    price?: number
    currency?: IdType
    owner?: IdType
    macroregion?: IdType
    locationFact?: MaybeNull<IdType>
    isNew?: boolean
    isWarranty?: boolean
    isRepaired?: boolean
    isLocationFactUndefined?: boolean
    usageCounter?: number
  }[]
}

export type CheckInventorizationEquipmentsSuccessResponse = void

export type CheckInventorizationEquipmentsBadRequestErrorResponse = TableRowsApiErrors
