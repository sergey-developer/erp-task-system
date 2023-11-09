import { ApiRequestMessages } from 'shared/types/messages'

export const getRelocationTaskListErrorMsg = 'Ошибка получения списка заявок на перемещение'
export const createRelocationTaskErrorMsg = 'Ошибка создания заявки на перемещение'
export const updateRelocationTaskErrorMsg = 'Ошибка обновления заявки на перемещение'

export const getRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки на перемещение',
}

export const getRelocationTaskWaybillM15Messages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования накладной М-15',
}

export const getRelocationEquipmentListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка оборудования по заявке на перемещение',
}

export const getRelocationEquipmentBalanceListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка остатков оборудования по заявке на перемещение',
}
