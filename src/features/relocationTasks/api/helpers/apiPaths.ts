import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from 'shared/utils/string'

import { RelocationTasksApiPathsEnum } from '../constants'
import { RequestWithRelocationTask } from '../types'

export const makeGetRelocationTaskApiPath = ({
  relocationTaskId,
}: RequestWithRelocationTask): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationTask, { id: String(relocationTaskId) })

export const makeReturnRelocationTaskToReworkApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.ReturnRelocationTaskToRework, { id: String(id) })

export const makeExecuteRelocationTaskApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.ExecuteRelocationTask, { id: String(id) })

export const makeCancelRelocationTaskApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.CancelRelocationTask, { id: String(id) })

export const makeCloseRelocationTaskApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.CloseRelocationTask, { id: String(id) })

export const makeGetRelocationTaskCompletionDocumentsApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationTaskCompletionDocuments, {
    id: String(id),
  })

export const makeCreateRelocationTaskCompletionDocumentsApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.CreateRelocationTaskCompletionDocuments, {
    id: String(id),
  })

export const makeGetRelocationTaskAttachmentsApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationTaskAttachments, { id: String(id) })

export const makeCreateRelocationTaskAttachmentApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.CreateRelocationTaskAttachment, { id: String(id) })

export const makeGetRelocationTaskWaybillM15ApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationTaskWaybillM15, { id: String(id) })

export const makeGetRelocationEquipmentListApiPath = ({
  relocationTaskId,
}: RequestWithRelocationTask): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationEquipmentList, {
    relocationTaskId: String(relocationTaskId),
  })

export const makeGetRelocationEquipmentBalanceListApiPath = (relocationTaskId: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.GetRelocationEquipmentBalanceList, {
    relocationTaskId: String(relocationTaskId),
  })

export const makeUpdateRelocationTaskApiPath = (id: IdType): string =>
  generateApiPath(RelocationTasksApiPathsEnum.UpdateRelocationTask, { id: String(id) })

export const makeUpdateExternalRelocationApiPath = (relocationTaskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(RelocationTasksApiPathsEnum.UpdateExternalRelocation, {
      relocationTaskId: String(relocationTaskId),
    }),
  )

export const makeMoveRelocationTaskDraftToWorkApiPath = ({
  relocationTaskId,
}: RequestWithRelocationTask): string =>
  generateApiPath(RelocationTasksApiPathsEnum.MoveRelocationTaskDraftToWork, {
    id: String(relocationTaskId),
  })
