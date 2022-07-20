import { useEffect } from 'react'

import useUserRole from 'modules/user/hooks/useUserRole'
import { useGetWorkGroupListQuery } from 'modules/workGroups/workGroups.service'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetWorkGroupList = () => {
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

  const state = useGetWorkGroupListQuery(null, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!state.isError) return

    // TODO: Найти как установить правильно тип. В CustomBaseQueryFn не получилось, ругается TS.
    const error = state.error as any

    if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification('Невозможно получить список рабочих групп')
    }
  }, [state.error, state.isError])

  return state
}

export default useGetWorkGroupList
