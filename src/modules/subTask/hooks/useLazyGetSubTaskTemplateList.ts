import { useCallback, useEffect } from 'react'

import { subTaskTemplateApiPermissions } from 'modules/subTask/permissions'
import { useLazyGetSubTaskTemplateListQuery } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

export const useLazyGetSubTaskTemplateList = () => {
  const permissions = useUserPermissions(subTaskTemplateApiPermissions)
  const [trigger, state] = useLazyGetSubTaskTemplateListQuery()

  const fn = useCallback(async () => {
    if (permissions.canGetList) {
      return trigger()
    }
  }, [permissions.canGetList, trigger])

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить шаблоны заданий')
  }, [state.isError])

  return { fn, state }
}
