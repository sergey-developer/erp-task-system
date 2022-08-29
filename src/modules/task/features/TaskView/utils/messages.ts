import { NumOrStr } from 'shared/interfaces/utils'

export const getTaskNotFoundErrorMsg = (id: NumOrStr): string =>
  `Заявка с идентификатором ${id} не найдена`

export const getTaskServerErrorMsg = (id: NumOrStr): string =>
  `Ошибка открытия заявки с идентификатором ${id}`

export const getTaskCommentListServerErrorMsg = (id: NumOrStr): string =>
  `Ошибка получения комментариев для заявки с идентификатором ${id}`
