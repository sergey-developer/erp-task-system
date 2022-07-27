import { useEffect } from 'react'

import { GetTaskQueryArgsModel } from 'modules/task/components/TaskView/models'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetTask = (id: GetTaskQueryArgsModel) => {
  const {
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
    isFirstLineSupportRole,
  } = useUserRole()

  const shouldSkip: boolean = !(
    isEngineerRole ||
    isSeniorEngineerRole ||
    isHeadOfDepartmentRole ||
    isFirstLineSupportRole
  )

  const state = useGetTaskQuery(id, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(`Заявка с идентификатором ${id} не найдена`)
    }

    if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status! >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification(`Ошибка открытия заявки с идентификатором ${id}`)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTask
