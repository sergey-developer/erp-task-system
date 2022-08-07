import { useEffect } from 'react'

import { GetTaskQueryArgsModel } from 'modules/task/components/TaskView/models'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import getTaskPermissions from '../permissions/getTask.permissions'

const useGetTask = (id: GetTaskQueryArgsModel) => {
  const permissions = useUserPermissions(getTaskPermissions)

  const state = useGetTaskQuery(id, {
    skip: !permissions.canGet,
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
