import { FC } from 'react'

import FiscalAccumulatorTable from 'modules/fiscalAccumulator/components/FiscalAccumulatorTable'
import { useGetFiscalAccumulatorList } from 'modules/fiscalAccumulator/hooks'

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
