import { useEffect } from 'react'

import { useGetTaskQuery } from 'modules/tasks/services/tasks.service'
import { GetTaskQueryArgsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import { HttpStatusCodeEnum } from 'shared/constants/http'
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

  const result = useGetTaskQuery(id, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!result.isError) return

    // TODO: Найти как установить правильно тип. В CustomBaseQueryFn не получилось, ругается TS.
    const error = result.error as any

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(`Заявка с идентификатором ${id} не найдена`)
    }

    if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification(`Ошибка открытия заявки с идентификатором ${id}`)
    }
  }, [id, result.error, result.isError])

  return result
}

export default useGetTask
