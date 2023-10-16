import { NumberOrString } from 'shared/types/utils'

export const getTaskCommentListServerErrorMsg = (id: NumberOrString): string =>
  `Ошибка получения комментариев для заявки с идентификатором ${id}`
