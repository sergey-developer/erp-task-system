import { ApiRequestMessages } from 'shared/types/messages'

export const createSuspendRequestMessages: ApiRequestMessages<'notFoundError' | 'badRequestError'> =
  {
    notFoundError: 'Невозможно перевести заявку в ожидание - заявка не найдена',
    badRequestError: 'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
  }

export const deleteSuspendRequestMessages: ApiRequestMessages<'notFoundError'> = {
  notFoundError: 'Заявка не найдена или не находится в ожидании',
}
