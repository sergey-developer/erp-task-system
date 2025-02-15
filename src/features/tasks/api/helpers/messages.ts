import { NumberOrString } from 'shared/types/utils'

export const makeGetTaskNotFoundErrorMessage = (id: NumberOrString): string =>
  `Заявка с идентификатором ${id} не найдена`

export const makeGetTaskServerErrorMessage = (id: NumberOrString): string =>
  `Ошибка открытия заявки с идентификатором ${id}`
