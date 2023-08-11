import { generatePath } from 'react-router-dom'

import {
  NomenclatureApiEnum,
  WarehouseApiEnum,
} from 'modules/warehouse/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getWarehouseUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(WarehouseApiEnum.GetWarehouse, { id: String(id) }),
  )

export const updateNomenclatureGroupUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureApiEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )
