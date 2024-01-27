import pick from 'lodash/pick'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { TaskModel } from 'modules/task/models'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { EmptyFn } from 'shared/types/utils'

type UseNavigateToCreateRelocationTaskSimplifiedPageParams = {
  task?: Pick<
    TaskModel,
    'id' | 'recordId' | 'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime' | 'shop' | 'assignee'
  >
  from?: string
}

export const useNavigateToCreateRelocationTaskSimplifiedPage = ({
  task,
  from,
}: UseNavigateToCreateRelocationTaskSimplifiedPageParams): EmptyFn => {
  const navigate = useNavigate()

  return useCallback(
    () =>
      navigate(WarehouseRouteEnum.CreateRelocationTaskSimplified, {
        state: {
          task: pick(
            task,
            'id',
            'recordId',
            'shop',
            'assignee',
            'olaNextBreachTime',
            'olaEstimatedTime',
            'olaStatus',
          ),
          from,
        },
      }),
    [from, navigate, task],
  )
}
