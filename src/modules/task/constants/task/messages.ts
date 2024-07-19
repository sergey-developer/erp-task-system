import { ApiRequestMessages } from 'shared/types/messages'

export const getTaskErrMsg = 'Ошибка получения заявки'
export const getTasksErrMsg = 'Ошибка получения списка заявок'
export const getTaskListMapErrMsg = 'Ошибка получения списка заявок для карты'
export const updateTaskDescriptionErrMsg = 'Ошибка изменения описания заявки'
export const updateTaskDeadlineErrMsg = 'Ошибка изменения срока выполнения заявки'

export const createTaskAttachmentErrMsg = 'Ошибка загрузки вложения заявки'

export const getTaskCompletionDocumentsErrMsg =
  'Ошибка получения данных о причинах вызова, выполненных работах, потраченном времени и связанных перемещениях оборудования по заявке itsm'

export const createTaskCompletionDocumentsErrMsg = 'Ошибка формирования акта о выполненных работах'

export const createInitiationReasonErrMsg = 'Ошибка создания причины вызова'
export const deleteInitiationReasonErrMsg = 'Ошибка удаления причины вызова'

export const createCompletedWorkErrMsg = 'Ошибка создания проведенных работ'
export const deleteCompletedWorkErrMsg = 'Ошибка удаления проведенных работ'

export const getTaskWorkPerformedActMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка формирования акта выполненных работ',
}

export const takeTaskErrMsg = 'Ошибка взятия заявки в работу'
export const resolveTaskErrMsg = 'Ошибка выполнения заявки'
export const returnTaskToFirstLineSupportErrMsg = 'Ошибка возврата заявки на первую линию поддержки'

export const createTaskRegistrationFNRequestErrMsg =
  'Ошибка создания запроса на регистрацию фискального накопителя'

export const getTaskRegistrationRequestRecipientsFNErrMsg =
  'Ошибка получения списков получателей запроса на регистрацию ФН'

export const getSubTasksErrMsg = 'Не удалось получить список заданий'
export const createSubTaskErrMsg = 'Не удалось создать задание'
export const cancelSubTaskErrMsg = 'Не удалось отменить задание'
export const reworkSubTaskErrMsg = 'Не удалось вернуть задание на доработку'

export const classifyTaskWorkTypeErrMsg = 'Ошибка классификации типа работ по заявке'
