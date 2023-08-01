import { ApiRequestMessages } from 'shared/types/messages'

export const resolveTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Невозможно выполнить заявку',
}

export const getTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки',
}

export const getTaskListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок',
}

export const getTaskListMapMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка заявок для карты',
}

export const getTaskWorkPerformedActMessages = {
  commonError: 'Ошибка формирования акта выполненных работ',
} as const

export const createTaskCommentMessages = {
  commonError: 'Возникла ошибка при добавлении комментария',
} as const

export const updateTaskWorkGroupMessages = {
  commonError: 'Возникла ошибка при назначении рабочей группы',
} as const

export const createReclassificationRequestMessages = {
  notFoundError:
    'Невозможно создать запрос на переклассификацию - заявка не найдена',
} as const

export const createSuspendRequestMessages = {
  notFoundError: 'Невозможно перевести заявку в ожидание - заявка не найдена',
  badRequestError:
    'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
} as const

export const deleteSuspendRequestMessages = {
  notFoundError: 'Заявка не найдена или не находится в ожидании',
} as const

export const updateTaskAssigneeMessages = {
  commonError: 'Невозможно изменить исполнителя',
} as const

export const getFiscalAccumulatorTaskListMessages = {
  commonError: 'Ошибка получения списка задач по фискальным накопителям',
} as const
