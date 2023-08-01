import { ApiRequestMessages } from 'shared/interfaces/messages'

export const taskApiMessages = {
  resolveTask: {
    commonError: 'Невозможно выполнить заявку',
  },
} as const

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

export const taskCommentApiMessages = {
  createComment: {
    commonError: 'Возникла ошибка при добавлении комментария',
  },
} as const

export const taskWorkGroupApiMessages = {
  updateWorkGroup: {
    commonError: 'Возникла ошибка при назначении рабочей группы',
  },
} as const

export const reclassificationRequestApiMessages = {
  createRequest: {
    notFoundError:
      'Невозможно создать запрос на переклассификацию - заявка не найдена',
  },
} as const

export const suspendRequestApiMessages = {
  createRequest: {
    notFoundError: 'Невозможно перевести заявку в ожидание - заявка не найдена',
    badRequestError:
      'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
  },
  deleteRequest: {
    notFoundError: 'Заявка не найдена или не находится в ожидании',
  },
} as const

export const taskAssigneeApiMessages = {
  updateAssignee: {
    commonError: 'Невозможно изменить исполнителя',
  },
} as const

export const getFiscalAccumulatorTaskListMessages = {
  commonError: 'Ошибка получения списка задач по фискальным накопителям',
} as const
