import { ApiRequestMessages } from "shared/types/messages";

export const updateTaskAssigneeMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Невозможно изменить исполнителя',
}
