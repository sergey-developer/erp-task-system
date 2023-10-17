import { ApiRequestMessages } from 'shared/types/messages'

export const getCountryListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка стран производителей',
}
