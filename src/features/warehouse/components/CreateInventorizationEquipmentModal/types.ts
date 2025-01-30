import { FormInstance } from 'antd'

import {
  EquipmentModel,
  EquipmentsCatalogModel,
  WarehouseListItemModel,
} from 'features/warehouse/models'

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
  equipments: EquipmentsCatalogModel
  equipmentsIsLoading: boolean

  onChangeEquipment: (value: IdType) => void
  equipment?: Pick<EquipmentModel, 'location'>
  equipmentIsLoading: boolean
  onClickCreateEquipment: (form: FormInstance<CreateInventorizationEquipmentFormFields>) => EmptyFn

  warehouses: Pick<WarehouseListItemModel, 'id' | 'title'>[]

  isLoading: boolean
  onSubmit: (
    values: CreateInventorizationEquipmentFormFields,
    form: FormInstance<CreateInventorizationEquipmentFormFields>,
  ) => Promise<void>
}
