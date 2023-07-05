import { FC } from 'react'

import FiscalAccumulatorTaskTable from 'modules/task/features/FiscalAccumulatorTaskTable'
import { useGetFiscalAccumulatorTaskList } from 'modules/task/hooks'

const FiscalAccumulatorTaskListPage: FC = () => {
  const {
    currentData: fiscalAccumulatorTaskList = [],
    isFetching: fiscalAccumulatorTaskListIsFetching,
  } = useGetFiscalAccumulatorTaskList()

  return (
    <FiscalAccumulatorTaskTable
      loading={fiscalAccumulatorTaskListIsFetching}
      dataSource={fiscalAccumulatorTaskList}
    />
  )
}

export default FiscalAccumulatorTaskListPage
