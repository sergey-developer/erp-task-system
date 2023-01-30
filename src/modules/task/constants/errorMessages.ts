export const taskApiMessages = {
  resolve: {
    commonError: 'Невозможно выполнить заявку',
  },
} as const

export const taskCommentApiMessages = {
  create: {
    commonError: 'Возникла ошибка при добавлении комментария',
  },
} as const

export const taskWorkGroupApiMessages = {
  update: {
    commonError: 'Возникла ошибка при назначении рабочей группы',
  },
} as const

export const reclassificationRequestApiMessages = {
  create: {
    notFoundError:
      'Невозможно создать запрос на переклассификацию - заявка не найдена',
  },
} as const

export const suspendRequestApiMessages = {
  create: {
    notFoundError: 'Невозможно перевести заявку в ожидание - заявка не найдена',
    badRequestError:
      'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
  },
  delete: {
    notFoundError: 'Заявка не найдена или не находится в ожидании',
  },
} as const

export const taskAssigneeApiMessages = {
  update: {
    commonError: 'Невозможно изменить исполнителя',
  },
} as const
