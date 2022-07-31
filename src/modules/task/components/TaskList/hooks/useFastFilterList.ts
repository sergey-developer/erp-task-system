import { useMemo } from 'react'

import { fastFilterNamesDict } from 'modules/task/components/TaskList/components/TaskListPage/constants'
import { FilterListItem } from 'modules/task/components/TaskList/components/TaskListPage/interfaces'
import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'
import useGetTaskCounters from 'modules/task/components/TaskList/hooks/useGetTaskCounters'

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
