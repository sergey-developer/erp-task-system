import { ApiRequestMessages } from "shared/types/messages";

export const getFiscalAccumulatorListMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка получения списка задач по фискальным накопителям',
  }
