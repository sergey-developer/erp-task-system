import { Flex } from 'antd'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { FC } from 'react'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

import { ReportsRoutesEnum } from '../../routes/routes'

const items: CatalogsProps['items'] = [
  {
    link: ReportsRoutesEnum.FiscalAccumulatorTasksReport,
    text: 'Отчёт по фискальным накопителям',
    permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
  },
  {
    link: ReportsRoutesEnum.MtsrReport,
    text: 'Отчёт основных показателей',
    permissions: [UserPermissionsEnum.ReportMainIndicatorsRead],
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
