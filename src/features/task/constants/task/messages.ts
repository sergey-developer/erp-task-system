import { ApiRequestMessages } from 'shared/types/messages'

export const createTaskErrorMessage = 'Ошибка создания заявки itsm'
export const getTaskErrorMessage = 'Ошибка получения заявки'
export const getTasksErrorMessage = 'Ошибка получения списка заявок'
export const getTaskListMapErrorMessage = 'Ошибка получения списка заявок для карты'
export const updateTaskDescriptionErrorMessage = 'Ошибка изменения описания заявки'
export const updateTaskDeadlineErrorMessage = 'Ошибка изменения срока выполнения заявки'

export const createTaskAttachmentErrorMessage = 'Ошибка загрузки вложения заявки'

export const getTaskCompletionDocumentsErrorMessage =
  'Ошибка получения данных о причинах вызова, выполненных работах, потраченном времени и связанных перемещениях оборудования по заявке itsm'

export const createTaskCompletionDocumentsErrorMessage =
  'Ошибка формирования акта о выполненных работах'

export const createInitiationReasonErrorMessage = 'Ошибка создания причины вызова'
export const deleteInitiationReasonErrorMessage = 'Ошибка удаления причины вызова'

export const createCompletedWorkErrorMessage = 'Ошибка создания проведенных работ'
export const deleteCompletedWorkErrorMessage = 'Ошибка удаления проведенных работ'

export const getTaskWorkPerformedActMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования акта выполненных работ',
}

export const takeTaskErrorMessage = 'Ошибка взятия заявки в работу'
export const resolveTaskErrorMessage = 'Ошибка выполнения заявки'
export const returnTaskToFirstLineSupportErrorMessage =
  'Ошибка возврата заявки на первую линию поддержки'

export const createTaskRegistrationFNRequestErrorMessage =
  'Ошибка создания запроса на регистрацию фискального накопителя'

export const getTaskRegistrationRequestRecipientsFNErrorMessage =
  'Ошибка получения списков получателей запроса на регистрацию ФН'

export const getSubTasksErrorMessage = 'Не удалось получить список заданий'
export const createSubTaskErrorMessage = 'Не удалось создать задание'
export const cancelSubTaskErrorMessage = 'Не удалось отменить задание'
export const reworkSubTaskErrorMessage = 'Не удалось вернуть задание на доработку'

export const classifyTaskWorkTypeErrorMessage = 'Ошибка классификации типа работ по заявке'
