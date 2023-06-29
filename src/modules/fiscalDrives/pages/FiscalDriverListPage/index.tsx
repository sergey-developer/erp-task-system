import { FC, useState } from 'react'

import FiscalDriverTable from 'modules/fiscalDrives/features/FiscalDriverTable'
import { getSort } from 'modules/fiscalDrives/features/FiscalDriverTable/utils'
import { GetFiscalDriverListQueryArgs } from 'modules/fiscalDrives/models'

import { SortOrderEnum } from 'shared/constants/sort'

const FiscalDriverListPage: FC = () => {
  const [queryArgs, setQueryArgs] = useState<GetFiscalDriverListQueryArgs>({
    sort: getSort('fiscalDriverId', SortOrderEnum.Ascend),
  })

  return (
    <FiscalDriverTable
      loading={false}
      onChange={() => {}}
      dataSource={[
        {
          id: 1,
          fiscalDriverId: 'fiscalDriverId',
          createdAt: 'createdAt',
          supportGroup: 'supportGroup',
          recordId: 'recordId',
          sapId: 'sapId',
          address: 'address',
          blockThrough: 'blockThrough',
          category: 'category',
          client: 'client',
          deadline: 'deadline',
          totalFd: 'totalFd',
          mr: 'mr',
        },
      ]}
      sort={queryArgs.sort}
    />
  )
}

export default FiscalDriverListPage
