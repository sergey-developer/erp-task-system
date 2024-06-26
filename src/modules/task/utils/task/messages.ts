import { NumberOrString } from 'shared/types/utils'

export const getTaskNotFoundErrMsg = (id: NumberOrString): string =>
  `Заявка с идентификатором ${id} не найдена`

export const getTaskServerErrMsg = (id: NumberOrString): string =>
  `Ошибка открытия заявки с идентификатором ${id}`
