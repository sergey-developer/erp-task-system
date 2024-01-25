import { useOutletContext } from 'react-router-dom'

import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'

import { FilterParams } from 'shared/types/filter'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentPageContextType = Partial<
  {
    filter: EquipmentFilterFormFields
  } & FilterParams
>

export const useEquipmentPageContext = () => {
  return useOutletContext<MaybeNull<EquipmentPageContextType>>()
}
