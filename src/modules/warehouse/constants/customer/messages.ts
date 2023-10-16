import { ApiRequestMessages } from 'shared/types/messages'

export const getCustomerListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка клиентов',
}
