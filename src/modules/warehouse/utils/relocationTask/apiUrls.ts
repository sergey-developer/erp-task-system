import { generatePath } from 'react-router-dom'

import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from 'shared/utils/string'

import { RelocationTaskRequestArgs } from '../../types'

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
  generateApiPath(RelocationTaskApiEnum.GetRelocationTaskCompletionDocuments, { id: String(id) })

export const createRelocationTaskCompletionDocumentsUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CreateRelocationTaskCompletionDocuments, { id: String(id) })

export const getRelocationTaskAttachmentsUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationTaskAttachments, { id: String(id) })

export const createRelocationTaskAttachmentUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.CreateRelocationTaskAttachment, { id: String(id) })

export const getRelocationTaskWaybillM15Url = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationTaskWaybillM15, { id: String(id) })

export const getRelocationEquipmentListUrl = (relocationTaskId: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationEquipmentList, {
    relocationTaskId: String(relocationTaskId),
  })

export const getRelocationEquipmentBalanceListUrl = (relocationTaskId: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.GetRelocationEquipmentBalanceList, {
    relocationTaskId: String(relocationTaskId),
  })

export const updateRelocationTaskUrl = (id: IdType): string =>
  generateApiPath(RelocationTaskApiEnum.UpdateRelocationTask, { id: String(id) })

export const updateExternalRelocationUrl = (relocationTaskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTaskApiEnum.UpdateExternalRelocation, {
      relocationTaskId: String(relocationTaskId),
    }),
  )

export const makeMoveRelocationTaskDraftToWorkApiUrl = ({
  relocationTaskId,
}: RelocationTaskRequestArgs): string =>
  generateApiPath(RelocationTaskApiEnum.MoveRelocationTaskDraftToWork, {
    id: String(relocationTaskId),
  })
