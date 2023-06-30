import { FC, useState } from 'react'

import FiscalDriverTable from 'modules/fiscalDrives/features/FiscalDriverTable'
import { GetFiscalDriverListQueryArgs } from 'modules/fiscalDrives/models'

const FiscalDriverListPage: FC = () => {
  const [queryArgs, setQueryArgs] =
    useState<Partial<GetFiscalDriverListQueryArgs>>()

  return (
    <FiscalDriverTable
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

export default FiscalDriverListPage
