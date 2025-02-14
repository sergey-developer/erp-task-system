import { NomenclaturesGroupsEndpointsEnum } from 'features/warehouse/constants/nomenclatureGroup'
import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const updateNomenclatureGroupUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclaturesGroupsEndpointsEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )
