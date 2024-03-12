import { ApiRequestMessages } from 'shared/types/messages'

export const getTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки',
}

export const getTaskListErrorMsg = 'Ошибка получения списка заявок'
export const getTaskListMapErrorMsg = 'Ошибка получения списка заявок для карты'
export const updateTaskDescriptionErrMsg = 'Ошибка изменения описания заявки'
export const updateTaskDeadlineErrMsg = 'Ошибка изменения срока выполнения заявки'

export const getTaskWorkPerformedActMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования акта выполненных работ',
}

export const resolveTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Невозможно выполнить заявку',
}

export const createSubTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось создать задание',
}
