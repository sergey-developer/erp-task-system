import { Flex, Typography } from 'antd'
import { FC } from 'react'

type ExecuteInventorizationReviseTabProps = {}

const { Title } = Typography

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = () => {
  return (
    <Flex vertical gap='small'>
      <Title level={5}>Перечень оборудования для сверки</Title>
    </Flex>
  )
}

export default ExecuteInventorizationReviseTab
