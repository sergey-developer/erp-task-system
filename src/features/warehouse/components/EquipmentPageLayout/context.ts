import { useOutletContext } from 'react-router-dom'

import { EquipmentsFilterFormFields } from 'features/warehouse/components/EquipmentFilter/types'
import { GetEquipmentsXlsxRequest } from 'features/warehouse/models'

import { FilterParams } from 'shared/types/filter'
import { MaybeNull } from 'shared/types/utils'

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
