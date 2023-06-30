import { FC, useState } from 'react'

import FiscalAccumulatorTaskTable from 'modules/task/features/FiscalAccumulatorTaskTable'
import { GetFiscalAccumulatorTaskListQueryArgs } from 'modules/task/models'

const FiscalAccumulatorTaskListPage: FC = () => {
  const [queryArgs, setQueryArgs] =
    useState<Partial<GetFiscalAccumulatorTaskListQueryArgs>>()

  return (
    <FiscalAccumulatorTaskTable
      loading={false}
      onChange={() => {}}
      dataSource={[
        {
          id: 1,
          fiscalAccumulator: { faNumber: 1 },
          createdAt: new Date().toISOString(),
          supportGroup: {
            name: 'name',
            macroregion: { title: 'title' },
          },
          recordId: 'recordId',
          sapId: 'sapId',
          address: 'address',
          blockingIn: 5,
          title: 'title',
          name: 'name',
          olaNextBreachTime: new Date().toISOString(),
          deadlineOrTotalFiscalDocs: 3,
        },
      ]}
      sort={queryArgs?.sort}
    />
  )
}

export default FiscalAccumulatorTaskListPage
