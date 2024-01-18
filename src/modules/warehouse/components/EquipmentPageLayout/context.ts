import { useOutletContext } from 'react-router-dom'

import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { GetEquipmentsXlsxQueryArgs } from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type EquipmentPageContextType = Partial<{
  filter: EquipmentFilterFormFields
  search: string
}> & {
  setGetEquipmentsXlsxParams: (
    params: Pick<GetEquipmentsXlsxQueryArgs, 'nomenclature' | 'ordering'>,
  ) => void
}

export const useEquipmentPageContext = () => {
  return useOutletContext<MaybeNull<EquipmentPageContextType>>()
}
