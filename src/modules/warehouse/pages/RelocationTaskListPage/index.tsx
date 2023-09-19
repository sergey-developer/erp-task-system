import { FC } from 'react'

import RelocationTaskTable from 'modules/warehouse/components/RelocationTaskTable'

import Space from 'components/Space'

const RelocationTaskListPage: FC = () => {
  return (
    <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
      <RelocationTaskTable dataSource={[]} pagination={false} loading={false} onChange={() => {}} />
    </Space>
  )
}

export default RelocationTaskListPage
