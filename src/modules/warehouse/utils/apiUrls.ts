import { generatePath } from 'react-router-dom'

import {
  NomenclatureApiEnum,
  NomenclatureGroupApiEnum,
  WarehouseApiEnum,
} from 'modules/warehouse/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getWarehouseUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(WarehouseApiEnum.GetWarehouse, { id: String(id) }),
  )

export const getNomenclatureUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureApiEnum.GetNomenclature, {
      id: String(id),
    }),
  )

export const updateNomenclatureUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureApiEnum.UpdateNomenclature, {
      id: String(id),
    }),
  )

export const updateNomenclatureGroupUrl = (id: number): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureGroupApiEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )
