import { ApiRequestMessages } from 'shared/types/messages'

export const getRelocationTasksErrorMsg = 'Ошибка получения списка заявок на перемещение'

export const createRelocationTaskErrorMsg = 'Ошибка создания заявки на перемещение'

export const createRelocationTaskITSMErrorMsg =
  'Ошибка создания заявки на перемещение, связанной с заявкой itsm'

export const updateRelocationTaskErrorMsg = 'Ошибка обновления заявки на перемещение'

export const getRelocationTaskCompletionDocumentsErrMsg =
  'Ошибка получения данных о перемещении и перемещаемом оборудовании для формирования пакета документов'

export const createRelocationTaskCompletionDocumentsErrMsg =
  'Ошибка формирования акта о выполненных работах'

export const getRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки на перемещение',
}
export const getRelocationTaskAttachmentsErrorMsg =
  'Ошибка получения вложений по заявке на перемещение'

export const returnRelocationTaskToReworkMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка возврата заявки на перемещение на доработку',
}

export const executeRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка выполнения заявки на перемещение',
}

export const cancelRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка отмены заявки на перемещение',
}

export const closeRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка закрытия заявки на перемещение',
}

export const createRelocationTaskAttachmentErrorMsg =
  'Ошибка создания вложения к заявке на перемещение'

export const getRelocationTaskWaybillM15ErrorMsg = 'Ошибка формирования накладной М-15'

export const getRelocationEquipmentListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка оборудования по заявке на перемещение',
}

export const getRelocationEquipmentBalanceListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка остатков оборудования по заявке на перемещение',
}

export const updateExternalRelocationErrMsg = 'Ошибка обновления внешнего перемещения'
