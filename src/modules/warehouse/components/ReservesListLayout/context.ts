import { useOutletContext } from 'react-router-dom'

import { EquipmentNomenclatureListFilterFormFields } from '../EquipmentNomenclatureListFilter/types'

export type ReservesListContextType = {
  filter: EquipmentNomenclatureListFilterFormFields
}

export const useReservesListContext = () => {
  return useOutletContext<ReservesListContextType>()
}
