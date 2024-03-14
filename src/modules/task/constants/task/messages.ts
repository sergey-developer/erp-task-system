import { ApiRequestMessages } from 'shared/types/messages'

export const getTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения заявки',
}

export const getTaskListErrorMsg = 'Ошибка получения списка заявок'
export const getTaskListMapErrorMsg = 'Ошибка получения списка заявок для карты'

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

export const resolveTaskErrMsg = 'Невозможно выполнить заявку'

export const createSubTaskMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось создать задание',
}
