import { ApiRequestMessages } from 'shared/types/messages'

export const getTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки',
}

export const getTaskListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок',
}

export const getTaskListMapMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок для карты',
}

export const getTaskWorkPerformedActMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования акта выполненных работ',
}

export const resolveTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Невозможно выполнить заявку',
}
