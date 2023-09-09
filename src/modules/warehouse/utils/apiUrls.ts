import { generatePath } from 'react-router-dom'

import {
  EquipmentApiEnum,
  NomenclatureApiEnum,
  NomenclatureGroupApiEnum,
  WarehouseApiEnum,
} from 'modules/warehouse/constants'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getWarehouseUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(WarehouseApiEnum.GetWarehouse, { id: String(id) }))

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

export const updateNomenclatureGroupUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(NomenclatureGroupApiEnum.UpdateNomenclatureGroup, {
      id: String(id),
    }),
  )

export const getEquipmentUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(EquipmentApiEnum.GetEquipment, { id: String(id) }))
