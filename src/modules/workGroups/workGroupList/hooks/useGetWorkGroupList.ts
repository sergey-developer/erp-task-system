import { notification } from 'antd'
import { useEffect } from 'react'

import useUserRole from 'modules/user/hooks/useUserRole'
import {
  UseGetWorkGroupListQueryReturnType,
  useGetWorkGroupListQuery,
} from 'modules/workGroups/workGroups.service'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'

const useGetWorkGroupList = (): UseGetWorkGroupListQueryReturnType => {
  const {
    isFirstLineSupportRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const shouldSkip: boolean = !(
    isFirstLineSupportRole ||
    isSeniorEngineerRole ||
    isHeadOfDepartmentRole
  )

  const result = useGetWorkGroupListQuery(null, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!result.isError) return

    // TODO: Найти как установить правильно тип. В CustomBaseQueryFn не получилось, ругается TS.
    const error = result.error as any

    if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      notification.error({
        message: 'Невозможно получить список рабочих групп',
        duration: ERROR_NOTIFICATION_DURATION,
      })
    }
  }, [result.error, result.isError])

  return result
}

export default useGetWorkGroupList
