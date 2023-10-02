import { useOutletContext } from 'react-router-dom'

import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentPageContextType = {
  equipmentIsLoading: boolean
  getEquipment: (id: IdType) => Promise<EquipmentModel>
  onClickEditEquipment: () => void
} & Partial<{
  equipment: EquipmentModel
  filter: EquipmentFilterFormFields
  search: string
}>

export const useEquipmentPageContext = () => {
  return useOutletContext<MaybeNull<EquipmentPageContextType>>()
}
