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

export const getTaskWorkPerformedActMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка формирования акта выполненных работ',
  }

export const createTaskCommentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Возникла ошибка при добавлении комментария',
}

export const updateTaskWorkGroupMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Возникла ошибка при назначении рабочей группы',
}

export const createReclassificationRequestMessages: ApiRequestMessages<'notFoundError'> =
  {
    notFoundError:
      'Невозможно создать запрос на переклассификацию - заявка не найдена',
  }

export const createSuspendRequestMessages: ApiRequestMessages<
  'notFoundError' | 'badRequestError'
> = {
  notFoundError: 'Невозможно перевести заявку в ожидание - заявка не найдена',
  badRequestError:
    'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
}

export const deleteSuspendRequestMessages: ApiRequestMessages<'notFoundError'> =
  {
    notFoundError: 'Заявка не найдена или не находится в ожидании',
  }

export const updateTaskAssigneeMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Невозможно изменить исполнителя',
}

export const getFiscalAccumulatorListMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка получения списка задач по фискальным накопителям',
  }
