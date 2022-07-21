import { useMemo } from 'react'

import { FastFilterEnum } from 'modules/tasks/constants'
import { fastFilterNamesDict } from 'modules/tasks/taskList/components/TaskListPage/constants'
import { FilterListItem } from 'modules/tasks/taskList/components/TaskListPage/interfaces'
import useGetTaskCounters from 'modules/tasks/taskList/hooks/useGetTaskCounters'

const useFastFilterList = () => {
  const { data, isError, ...state } = useGetTaskCounters()

  const fastFilterList: Array<FilterListItem> = useMemo(() => {
    const counters = (data || {}) as NonNullable<typeof data>

    return Object.values(FastFilterEnum).map((fastFilterKey) => {
      const taskCounterKey =
        fastFilterKey.toLowerCase() as Lowercase<FastFilterEnum>
      const taskCounterValue = isError ? null : counters[taskCounterKey]

      return {
        text: fastFilterNamesDict[fastFilterKey],
        value: fastFilterKey,
        amount: taskCounterValue,
      }
    })
  }, [isError, data])

  return {
    ...state,
    data: fastFilterList,
    isError,
  }
}

export default useFastFilterList
