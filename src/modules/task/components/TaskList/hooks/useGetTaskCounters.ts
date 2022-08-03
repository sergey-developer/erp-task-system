import { useEffect } from 'react'

import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

const useGetTaskCounters = () => {
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

  const state = useGetTaskCountersQuery(null, {
    skip: shouldSkip,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse
    const errorDetail = getErrorDetail(error)
    showMultipleErrorNotification(errorDetail)
  }, [state.error, state.isError])

  return state
}

export default useGetTaskCounters
