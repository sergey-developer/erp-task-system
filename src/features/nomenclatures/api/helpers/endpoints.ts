import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from 'shared/utils/string'

import { NomenclaturesApiPathsEnum, NomenclaturesGroupsApiPathsEnum } from '../constants'

export const makeGetNomenclatureApiPath = (id: IdType): string =>
  generateApiPath(NomenclaturesApiPathsEnum.GetNomenclature, { id: String(id) })

export const makeUpdateNomenclatureApiPath = (id: IdType): string =>
  generateApiPath(NomenclaturesApiPathsEnum.UpdateNomenclature, { id: String(id) })

export const makeUpdateNomenclatureGroupApiPath = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclaturesGroupsApiPathsEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )
