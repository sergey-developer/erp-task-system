import { useEffect } from 'react'

import useUserRole from 'modules/user/hooks/useUserRole'
import {
  UseGetWorkGroupListQueryReturnType,
  useGetWorkGroupListQuery,
} from 'modules/workGroups/workGroups.service'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

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
      showErrorNotification('Невозможно получить список рабочих групп')
    }
  }, [result.error, result.isError])

  return result
}

export default useGetWorkGroupList
