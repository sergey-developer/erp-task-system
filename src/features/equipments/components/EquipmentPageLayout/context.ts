import { EquipmentsFilterFormFields } from 'features/equipments/components/EquipmentFilter/types'
import { useOutletContext } from 'react-router-dom'

import { FilterParams } from 'shared/types/filter'
import { MaybeNull } from 'shared/types/utils'

import { GetEquipmentsXlsxRequest } from '../../api/schemas'

export type EquipmentPageContextType = Partial<{
  filter: EquipmentsFilterFormFields
}> & {
  setEquipmentsXlsxParams: (
    params: Pick<GetEquipmentsXlsxRequest, 'nomenclature' | 'ordering'>,
  ) => void
} & FilterParams

export const useEquipmentPageContext = () => {
  return useOutletContext<MaybeNull<EquipmentPageContextType>>()
}
