import { NumberOrString } from "shared/types/utils";

export const getTaskNotFoundErrorMsg = (id: NumberOrString): string =>
  `Заявка с идентификатором ${id} не найдена`

export const getTaskServerErrorMsg = (id: NumberOrString): string =>
  `Ошибка открытия заявки с идентификатором ${id}`
