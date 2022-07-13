import { notification } from 'antd'
import { useEffect } from 'react'

import {
  UseGetTaskCommentListQueryReturnType,
  useGetTaskCommentListQuery,
} from 'modules/tasks/services/taskComments.service'
import { GetTaskCommentListQueryArgsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'

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

  const result = useGetTaskCommentListQuery(id, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!result.isError) return

    // TODO: Найти как установить правильно тип. В CustomBaseQueryFn не получилось, ругается TS.
    const error = result.error as any

    if (error.status === HttpStatusCodeEnum.NotFound) {
      notification.error({
        message: `Заявка с идентификатором ${id} не найдена`,
        duration: ERROR_NOTIFICATION_DURATION,
      })
    }

    if (error.status >= HttpStatusCodeEnum.ServerError) {
      notification.error({
        message: `Ошибка получения комментариев для заявки с идентификатором ${id}`,
        duration: ERROR_NOTIFICATION_DURATION,
      })
    }
  }, [id, result.error, result.isError])

  return result
}

export default useGetTaskCommentList
