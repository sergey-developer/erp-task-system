import { generatePath } from 'react-router-dom'

import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getRelocationTaskUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.GetRelocationTask, { id: String(id) }))

export const closeRelocationTaskUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.CloseRelocationTask, { id: String(id) }))

export const returnRelocationTaskToReworkUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTaskApiEnum.ReturnRelocationTaskToRework, { id: String(id) }),
  )

export const cancelRelocationTaskUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.CancelRelocationTask, { id: String(id) }))

export const executeRelocationTaskUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.ExecuteRelocationTask, { id: String(id) }))

export const createRelocationTaskAttachmentUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CreateRelocationTaskAttachment, { id: String(id) })

export const getRelocationTaskWaybillM15Url = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTaskApiEnum.GetRelocationTaskWaybillM15, { id: String(id) }),
  )

export const getRelocationEquipmentListUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTaskApiEnum.GetRelocationEquipmentList, { id: String(id) }),
  )

export const getRelocationEquipmentBalanceListUrl = (id: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTaskApiEnum.GetRelocationEquipmentBalanceList, { id: String(id) }),
  )

export const updateRelocationTaskUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.UpdateRelocationTask, { id: String(id) }))
