import { useOutletContext } from 'react-router-dom'

import { EquipmentFilterFormFields } from '../EquipmentFilter/types'

export type EquipmentPageContextType = Partial<{
  filter: EquipmentFilterFormFields
  search: string
}>

export const useEquipmentPageContext = () => {
  return useOutletContext<EquipmentPageContextType>() || {}
}
