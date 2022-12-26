import { useCallback, useEffect } from 'react'

import { useUserPermissions } from 'modules/user/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { subTaskTemplateApiPermissions } from '../permissions'
import { useLazyGetSubTaskTemplateListQuery } from '../services/subTaskApi.service'

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
