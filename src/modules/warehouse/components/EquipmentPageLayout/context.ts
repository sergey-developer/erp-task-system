import { useOutletContext } from 'react-router-dom'

import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'

export type EquipmentPageContextType = Partial<{
  filter: EquipmentFilterFormFields
  search: string
}>

export const useEquipmentPageContext = () => {
  return useOutletContext<EquipmentPageContextType>() || {}
}
