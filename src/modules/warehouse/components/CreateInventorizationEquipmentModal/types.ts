import { FormInstance } from 'antd'

import {
  EquipmentCatalogListModel,
  EquipmentModel,
  InventorizationModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'
import { SetNonNullable } from 'shared/types/utils'

export type CreateInventorizationEquipmentFormFields = {
  equipment: IdType
  locationFact: IdType
}

export type CreateInventorizationEquipmentModalProps = SetNonNullable<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  equipmentCatalog: EquipmentCatalogListModel
  equipmentCatalogIsLoading: boolean
  onChangeEquipment: (value: IdType) => void
  equipment?: Pick<EquipmentModel, 'location'>
  equipmentIsLoading: boolean

  warehouses: InventorizationModel['warehouses']

  isLoading: boolean
  onSubmit: (
    values: CreateInventorizationEquipmentFormFields,
    setFields: FormInstance<CreateInventorizationEquipmentFormFields>['setFields'],
  ) => Promise<void>
}
