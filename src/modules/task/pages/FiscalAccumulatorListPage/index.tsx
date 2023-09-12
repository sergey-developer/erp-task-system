import { FC } from 'react'

import FiscalAccumulatorTable from 'modules/task/components/FiscalAccumulatorTable'
import { useGetFiscalAccumulatorList } from 'modules/task/hooks'

const FiscalAccumulatorListPage: FC = () => {
  const { currentData: fiscalAccumulatorList = [], isFetching: fiscalAccumulatorListIsFetching } =
    useGetFiscalAccumulatorList()

  return (
    <FiscalAccumulatorTable
      loading={fiscalAccumulatorListIsFetching}
      dataSource={fiscalAccumulatorList}
    />
  )
}

export default FiscalAccumulatorListPage
