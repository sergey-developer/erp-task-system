import { FormInstance } from 'antd'
import { EquipmentDetailDTO, EquipmentsCatalogDTO } from 'features/equipments/api/dto'
import { WarehouseDTO } from 'features/warehouses/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'
import { EmptyFn, SetNonNullable } from 'shared/types/utils'

export type CreateInventorizationEquipmentFormFields = {
  equipment: IdType
  locationFact: IdType
}

export type CreateInventorizationEquipmentModalProps = SetNonNullable<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  equipments: EquipmentsCatalogDTO
  equipmentsIsLoading: boolean

  onChangeEquipment: (value: IdType) => void
  equipment?: Pick<EquipmentDetailDTO, 'location'>
  equipmentIsLoading: boolean
  onClickCreateEquipment: (form: FormInstance<CreateInventorizationEquipmentFormFields>) => EmptyFn

  warehouses: Pick<WarehouseDTO, 'id' | 'title'>[]

  isLoading: boolean
  onSubmit: (
    values: CreateInventorizationEquipmentFormFields,
    form: FormInstance<CreateInventorizationEquipmentFormFields>,
  ) => Promise<void>
}
