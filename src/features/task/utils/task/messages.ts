import { NumberOrString } from 'shared/types/utils'

export const getTaskNotFoundErrorMessage = (id: NumberOrString): string =>
  `Заявка с идентификатором ${id} не найдена`

export const getTaskServerErrorMessage = (id: NumberOrString): string =>
  `Ошибка открытия заявки с идентификатором ${id}`
