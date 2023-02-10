export const taskApiMessages = {
  resolveTask: {
    commonError: 'Невозможно выполнить заявку',
  },
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
