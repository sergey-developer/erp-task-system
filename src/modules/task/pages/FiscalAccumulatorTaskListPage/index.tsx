import { FC, useState } from 'react'

import { FiscalAccumulatorFormatEnum } from 'modules/task/constants'
import FiscalAccumulatorTaskTable from 'modules/task/features/FiscalAccumulatorTaskTable'
import { useGetFiscalAccumulatorTaskList } from 'modules/task/hooks'
import { GetFiscalAccumulatorTaskListQueryArgs } from 'modules/task/models'

const FiscalAccumulatorTaskListPage: FC = () => {
  const [
    fiscalAccumulatorTaskListQueryArgs,
    setFiscalAccumulatorTaskListQueryArgs,
  ] = useState<GetFiscalAccumulatorTaskListQueryArgs>({})

  const {
    currentData: fiscalAccumulatorTaskList = [],
    isFetching: fiscalAccumulatorTaskListIsFetching,
  } = useGetFiscalAccumulatorTaskList(fiscalAccumulatorTaskListQueryArgs)

  return (
    <FiscalAccumulatorTaskTable
      loading={fiscalAccumulatorTaskListIsFetching}
      onChange={() => {}}
      dataSource={[
        {
          id: 1,
          fiscalAccumulator: { faNumber: 1 },
          createdAt: new Date().toISOString(),
          supportGroup: {
            id: 1,
            name: 'name',
            macroregion: { title: 'title', id: 1 },
          },
          recordId: 'recordId',
          sapId: 'sapId',
          address: 'address',
          blockingIn: 5,
          title: 'title',
          name: 'name',
          olaNextBreachTime: new Date().toISOString(),
          deadlineOrTotalFiscalDocs: 3,
          faFormat: FiscalAccumulatorFormatEnum.OutOfMemoryLess7,
        },
      ]}
      sort={fiscalAccumulatorTaskListQueryArgs.sort}
    />
  )
}

export default FiscalAccumulatorTaskListPage
