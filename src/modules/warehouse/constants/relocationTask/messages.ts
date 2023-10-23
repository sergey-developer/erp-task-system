import { ApiRequestMessages } from 'shared/types/messages'

export const getRelocationTaskListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок на перемещение',
}

export const getRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки на перемещение',
}

export const returnRelocationTaskToReworkMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка возврата заявки на перемещение на доработку',
}

export const getRelocationTaskWaybillM15Messages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования накладной М-15',
}

export const getRelocationEquipmentListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка оборудования по заявке на перемещение',
}


