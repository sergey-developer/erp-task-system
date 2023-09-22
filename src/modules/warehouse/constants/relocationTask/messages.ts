import { ApiRequestMessages } from 'shared/types/messages'

export const getRelocationTaskListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок на перемещение',
}

export const getRelocationTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки на перемещение',
}

export const getRelocationEquipmentListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка оборудования по заявке на перемещение',
}
