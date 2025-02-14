import { NomenclaturesEndpointsEnum } from 'features/nomenclatures/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getNomenclatureUrl = (id: IdType): string =>
  generateApiPath(NomenclaturesEndpointsEnum.GetNomenclature, { id: String(id) })

export const updateNomenclatureUrl = (id: IdType): string =>
  generateApiPath(NomenclaturesEndpointsEnum.UpdateNomenclature, { id: String(id) })
