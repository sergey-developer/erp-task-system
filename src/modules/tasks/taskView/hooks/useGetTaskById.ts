import { notification } from 'antd'
import { useEffect } from 'react'

import { useGetTaskByIdQuery } from 'modules/tasks/tasks.service'
import { GetTaskByIdQueryArgsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'

const useGetTaskById = (
  id: GetTaskByIdQueryArgsModel,
): ReturnType<typeof useGetTaskByIdQuery> => {
  const { isEngineerRole, isSeniorEngineerRole, isHeadOfDepartmentRole } =
    useUserRole()

  const shouldSkip: boolean =
    isEngineerRole || isSeniorEngineerRole || isHeadOfDepartmentRole

  const result = useGetTaskByIdQuery(id, {
    skip: !shouldSkip,
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

    if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      notification.error({
        message: `Ошибка открытия заявки с идентификатором ${id}`,
        duration: ERROR_NOTIFICATION_DURATION,
      })
    }
  }, [id, result.error, result.isError])

  return result
}

export default useGetTaskById
