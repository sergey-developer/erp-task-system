import { useEffect } from 'react'

import { GetTaskCommentListQueryArgsModel } from 'modules/task/components/TaskView/models'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskCommentApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { taskCommentListApiPermissions } from '../permissions/taskCommentList.permissions'

const useGetTaskCommentList = (id: GetTaskCommentListQueryArgsModel) => {
  const permissions = useUserPermissions(taskCommentListApiPermissions.getList)

  const state = useGetTaskCommentListQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(`Заявка с идентификатором ${id} не найдена`)
    }

    if (error.status! >= HttpStatusCodeEnum.ServerError) {
      showErrorNotification(
        `Ошибка получения комментариев для заявки с идентификатором ${id}`,
      )
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTaskCommentList
