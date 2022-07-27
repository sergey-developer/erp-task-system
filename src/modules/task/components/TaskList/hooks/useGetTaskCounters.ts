import { useEffect } from 'react'

import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

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

    const error = state.error as any
    showErrorNotification(error.data)
  }, [state.error, state.isError])

  return state
}

export default useGetTaskCounters
