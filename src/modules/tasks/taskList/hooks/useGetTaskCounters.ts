import { notification } from 'antd'
import { useEffect } from 'react'

import { useGetTaskCountersQuery } from 'modules/tasks/services/tasks.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'
import { getErrorDetail } from 'shared/services/api'

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

    notification.error({
      message: getErrorDetail(error.data),
      duration: ERROR_NOTIFICATION_DURATION,
    })
  }, [state.error, state.isError])

  return state
}

export default useGetTaskCounters
