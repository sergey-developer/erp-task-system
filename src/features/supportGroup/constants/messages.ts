import { ApiRequestMessages } from 'shared/types/messages'

export const getSupportGroupListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Возникла ошибка при получении групп поддержки',
}
