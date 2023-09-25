import { ApiRequestMessages } from 'shared/types/messages'

export const createReclassificationRequestMessages: ApiRequestMessages<'notFoundError'> = {
  notFoundError: 'Невозможно создать запрос на переклассификацию - заявка не найдена',
}
