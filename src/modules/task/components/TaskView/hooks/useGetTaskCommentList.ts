import { useEffect } from 'react'

import { GetTaskCommentListQueryArgsModel } from 'modules/task/components/TaskView/models'
import {
  UseGetTaskCommentListQueryReturnType,
  useGetTaskCommentListQuery,
} from 'modules/task/services/taskComments.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetTaskCommentList = (
  id: GetTaskCommentListQueryArgsModel,
): UseGetTaskCommentListQueryReturnType => {
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

  const state = useGetTaskCommentListQuery(id, {
    skip: shouldSkip,
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
