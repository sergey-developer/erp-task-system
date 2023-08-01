import { ApiRequestMessages } from 'shared/types/messages'

export const createSubTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось создать задание',
}

export const getSubTaskTemplateListMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Не удалось получить шаблоны заданий',
  }
