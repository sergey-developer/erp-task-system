import { ApiRequestMessages } from 'shared/types/messages'

export const getCurrencyListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка валют',
}
