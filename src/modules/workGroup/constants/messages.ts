import { ApiRequestMessages } from 'shared/types/messages'

export const getWorkGroupListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Возникла ошибка при получении списка рабочих групп',
}
