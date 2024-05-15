import { NomenclatureApiEnum } from 'modules/warehouse/constants/nomenclature'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getNomenclatureUrl = (id: IdType): string =>
  generateApiPath(NomenclatureApiEnum.GetNomenclature, { id: String(id) })

export const updateNomenclatureUrl = (id: IdType): string =>
  generateApiPath(NomenclatureApiEnum.UpdateNomenclature, { id: String(id) })
