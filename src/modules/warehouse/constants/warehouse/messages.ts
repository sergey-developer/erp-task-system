import { ApiRequestMessages } from 'shared/types/messages'

export const getWarehouseListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка складов',
}

export const getWarehouseMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения склада',
}
