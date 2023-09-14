import { generatePath } from 'react-router-dom'

import { NomenclatureApiEnum } from 'modules/warehouse/constants/nomenclature'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getNomenclatureUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureApiEnum.GetNomenclature, {
      id: String(id),
    }),
  )

export const updateNomenclatureUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureApiEnum.UpdateNomenclature, {
      id: String(id),
    }),
  )
