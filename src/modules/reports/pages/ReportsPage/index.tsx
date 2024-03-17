import { Flex } from 'antd'
import { FC } from 'react'

import { ReportsRoutesEnum } from 'modules/reports/constants'
import { UserPermissionsEnum } from 'modules/user/constants'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: ReportsRoutesEnum.FiscalAccumulatorTasksReport,
    text: 'Отчёт по фискальным накопителям',
    permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
  },
  {
    link: ReportsRoutesEnum.MtsrReport,
    text: 'Отчёт основных показателей',
    // permissions: [UserPermissionsEnum.ReportMtsrRead],
  },
]

const ReportsPage: FC = () => {
  return (
    <Flex data-testid='reports-page' vertical>
      <Catalogs data-testid='reports-catalog' items={items} />
    </Flex>
  )
}

export default ReportsPage
