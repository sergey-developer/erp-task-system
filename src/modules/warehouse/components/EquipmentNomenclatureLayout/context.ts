import { useOutletContext } from 'react-router-dom'

import { EquipmentNomenclatureListFilterFormFields } from '../EquipmentNomenclatureListFilter/types'

export type EquipmentNomenclatureContextType = Partial<{
  filter: EquipmentNomenclatureListFilterFormFields
  search: string
}>

export const useEquipmentNomenclatureContext = () => {
  return useOutletContext<EquipmentNomenclatureContextType>()
}
