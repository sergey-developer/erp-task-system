import { generatePath } from 'react-router-dom'

import { NomenclatureGroupApiEnum } from 'modules/warehouse/constants/nomenclatureGroup'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const updateNomenclatureGroupUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureGroupApiEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )
