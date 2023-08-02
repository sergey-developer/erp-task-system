import { NumberOrString } from 'shared/types/utils'

// todo: вынести в errorMessage и переименовать их в messageTemplates
export const getTaskNotFoundErrorMsg = (id: NumberOrString): string =>
  `Заявка с идентификатором ${id} не найдена`

export const getTaskServerErrorMsg = (id: NumberOrString): string =>
  `Ошибка открытия заявки с идентификатором ${id}`

export const getTaskCommentListServerErrorMsg = (id: NumberOrString): string =>
  `Ошибка получения комментариев для заявки с идентификатором ${id}`
