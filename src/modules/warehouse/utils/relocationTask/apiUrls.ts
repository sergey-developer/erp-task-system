import { generatePath } from "react-router-dom";

import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from "shared/utils/string";

export const getRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationTask, { id: String(id) })

export const returnRelocationTaskToReworkUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.ReturnRelocationTaskToRework, { id: String(id) })

export const executeRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.ExecuteRelocationTask, { id: String(id) })

export const cancelRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CancelRelocationTask, { id: String(id) })

export const closeRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CloseRelocationTask, { id: String(id) })

export const getRelocationTaskCompletionDocumentsUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetCompletionDocuments, { id: String(id) })

export const getRelocationTaskAttachmentsUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationTaskAttachments, { id: String(id) })

export const createRelocationTaskAttachmentUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CreateRelocationTaskAttachment, { id: String(id) })

export const getRelocationTaskWaybillM15Url = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationTaskWaybillM15, { id: String(id) })

export const getRelocationEquipmentListUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationEquipmentList, { id: String(id) })

export const getRelocationEquipmentBalanceListUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationEquipmentBalanceList, { id: String(id) })

export const updateRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.UpdateRelocationTask, { id: String(id) })

export const updateExternalRelocationUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(RelocationTaskApiEnum.UpdateExternalRelocation, { id: String(id) }))
