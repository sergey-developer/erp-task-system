import { ApiRequestMessages } from "shared/types/messages";

export const createTaskCommentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Возникла ошибка при добавлении комментария',
}
